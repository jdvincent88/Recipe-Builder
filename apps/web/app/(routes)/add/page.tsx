'use client';
import { useState } from 'react';

export default function AddPage(){
  const [url, setUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function doImport(){
    setImporting(true);
    const res = await fetch(`/api/import?url=${encodeURIComponent(url)}`);
    setResult(await res.json());
    setImporting(false);
  }

  return (
    <main>
      <h2>Import from URL</h2>
      <input placeholder="https://..." value={url} onChange={e=>setUrl(e.target.value)} style={{padding:8,width:'60%'}} />
      <button onClick={doImport} disabled={!url || importing} style={{marginLeft:8}}>Import</button>
      {result && (
        <pre style={{whiteSpace:'pre-wrap', background:'#f5f5f5', padding:12, marginTop:12}}>
          {JSON.stringify(result,null,2)}
        </pre>
      )}
      <hr/>
      <h2>Manual entry (MVP)</h2>
      <p>Coming next: form with title, yield, ingredients, steps, and photos.</p>
    </main>
  );
}
