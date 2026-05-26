export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Seite nicht gefunden</h2>
          <a
            href="/de"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '0.5rem',
              textDecoration: 'none',
            }}
          >
            Zur Startseite
          </a>
        </div>
      </body>
    </html>
  );
}
