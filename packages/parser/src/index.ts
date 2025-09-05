import { parse } from 'node:path';
import { request } from 'undici';
import * as cheerio from 'cheerio';

export type ParsedIngredient = { text: string };
export type ParsedStep = { text: string; timerSec?: number };

export type ParsedRecipe = {
  title: string;
  yield?: string;
  ingredients: ParsedIngredient[];
  steps: ParsedStep[];
  photos?: string[];
  sourceUrl: string;
};

function readJsonLd($: cheerio.CheerioAPI): any | null {
  const nodes = $('script[type="application/ld+json"]');
  for (const el of nodes.toArray()) {
    try {
      const json = JSON.parse($(el).contents().text());
      if (Array.isArray(json)) {
        const first = json.find(x => x['@type'] === 'Recipe');
        if (first) return first;
      } else if (json['@type'] === 'Recipe' || (Array.isArray(json['@graph']) && json['@graph'].some((g:any)=>g['@type']==='Recipe'))) {
        return json['@type'] === 'Recipe' ? json : json['@graph'].find((g:any)=>g['@type']==='Recipe');
      }
    } catch {}
  }
  return null;
}

export async function importFromUrl(url: string): Promise<ParsedRecipe> {
  const res = await request(url);
  const html = await res.body.text();
  const $ = cheerio.load(html);

  const ld = readJsonLd($);
  if (ld) {
    const title = ld.name || $('title').text().trim();
    const photos = Array.isArray(ld.image) ? ld.image : ld.image ? [ld.image] : [];
    const ingredients = (ld.recipeIngredient || []).map((t: string) => ({text: String(t)}));
    const steps = (ld.recipeInstructions || [])
      .map((s: any) => typeof s === 'string' ? {text: s} : {text: s.text || ''});
    return { title, yield: ld.recipeYield, ingredients, steps, photos, sourceUrl: url };
  }

  // Fallback: scrape heuristics
  const title = $('h1').first().text().trim() || $('title').text().trim();
  const ingredients: ParsedIngredient[] = [];
  $('li').each((_, li) => {
    const t = $(li).text().trim();
    if (/\b(cup|tsp|tbsp|oz|g|ml|pound|lb|teaspoon|tablespoon)\b/i.test(t)) {
      ingredients.push({text: t});
    }
  });
  const steps: ParsedStep[] = [];
  $('ol li, .instructions li').each((_, li) => {
    const t = $(li).text().trim();
    if (t.length > 40) steps.push({text: t});
  });

  return { title, ingredients, steps, sourceUrl: url };
}
