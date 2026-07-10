# Floating WhatsApp Widget

Ein interaktiver, frei ziehbarer (draggable) WhatsApp Button für Next.js Projekte.

## Features

1. **Drag & Throw Physics**: Mit Schwung werfen, prallt an den Bildschirmrändern ab.
2. **Edge-Snapping**: Rastet am nächstgelegenen Bildschirmrand ein.
3. **Pulse Animation**: Pulsierender Effekt, wenn das Widget inaktiv ist.
4. **Haptisches Feedback**: Nutzt die Vibration-API auf Mobilgeräten.
5. **Kontextbasierte Nachrichten**: Erlaubt es, je nach Unterseite (z.B. `/preise`) unterschiedliche WhatsApp-Texte vorab einzufügen.
6. **Notification Badge**: Rote "1" für die ersten 30 Sekunden, um Aufmerksamkeit zu generieren.

## Installation & Nutzung

1. Kopiere die Datei `FloatingWhatsAppWidget.tsx` in deinen `components` Ordner.
2. Importiere und nutze die Komponente idealerweise in deiner `app/layout.tsx`, damit der Button auf allen Seiten sichtbar ist:

```tsx
import FloatingWhatsAppWidget from '@/components/FloatingWhatsAppWidget';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <FloatingWhatsAppWidget
          phoneNumber="+4915201234567"
          defaultMessage="Hallo, ich brauche Hilfe!"
        />
      </body>
    </html>
  );
}
```

## Anpassungen

- **Seitenspezifische Nachrichten**:
  Suche in der Datei nach der Funktion `getContextualMessage`. Dort kannst du mit `pathname.includes("/deine-route")` einstellen, dass auf bestimmten Seiten ein spezieller Text in WhatsApp vorausgefüllt wird.
- **Analytics**:
  In der Funktion `onClick` findest du einen auskommentierten Bereich für Google Analytics (`gtag`). Diesen kannst du für dein Tracking nutzen.
