import type { Metadata } from 'next';
import { ORBMANIA_COLORS } from '@orbmania/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orbmania.io - Original Multiplayer Orbital Energy Game',
  description: 'Experience the thrill of orbital energy combat in this original multiplayer .io game. Collect energy shards, master orbital mechanics, and dominate the arena.',
  keywords: ['orbmania', 'io game', 'multiplayer', 'orbital', 'energy', 'realtime', 'browser game'],
  authors: [{ name: 'Orbmania Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: ORBMANIA_COLORS.BACKGROUND,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: ORBMANIA_COLORS.BACKGROUND,
        color: ORBMANIA_COLORS.TEXT_PRIMARY,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}