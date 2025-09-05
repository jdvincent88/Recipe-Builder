export type Unit = 'g'|'kg'|'ml'|'l'|'tsp'|'tbsp'|'cup'|'oz'|'lb'|'each';

export type Ingredient = {
  name: string;
  quantity: number;
  unit?: Unit;
  notes?: string;
};

export type Step = {
  order: number;
  text: string;
  timerSec?: number; // optional timer length
};

export type Recipe = {
  id?: string;
  title: string;
  yield?: string; // "4 servings" or "2 loaves"
  ingredients: Ingredient[];
  steps: Step[];
  photos?: string[];
  tags?: string[];
};

export function scaleIngredients(ings: Ingredient[], factor: number): Ingredient[] {
  return ings.map(i => ({...i, quantity: +(i.quantity * factor).toFixed(3)}));
}

const VOLUME_TO_ML: Record<Unit, number> = {
  tsp: 5, tbsp: 15, cup: 240, oz: 30,
  ml: 1, l: 1000, g: 1, kg: 1000, lb: 454, each: 1
} as any;

export function convertQuantity(qty: number, from: Unit, to: Unit): number {
  if (from === to) return qty;
  if (!(from in VOLUME_TO_ML) || !(to in VOLUME_TO_ML)) throw new Error('Unsupported unit');
  const ml = qty * VOLUME_TO_ML[from];
  return +(ml / VOLUME_TO_ML[to]).toFixed(3);
}

// Quick measurement reference (for UI display)
export const QUICK_EQUIV = [
  {from: '1 tbsp', to: '3 tsp'},
  {from: '1 cup', to: '16 tbsp'},
  {from: '8 oz', to: '1 cup (approx)'},
];
