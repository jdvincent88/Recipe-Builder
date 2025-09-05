import Link from 'next/link';

export default function Page(){
  return (
    <main>
      <p>Welcome. Import a recipe from a URL, or enter one manually. Scale and set timers per step.</p>
      <ul>
        <li><Link href="/add">Add a recipe</Link></li>
      </ul>
    </main>
  );
}
