export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body style={{fontFamily:'system-ui', margin:0, padding:16}}>
        <header style={{display:'flex',gap:12,alignItems:'center',marginBottom:16}}>
          <h1 style={{margin:0}}>Recipe Builder</h1>
          <nav style={{display:'flex',gap:12}}>
            <a href="/">Home</a>
            <a href="/add">Add</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
