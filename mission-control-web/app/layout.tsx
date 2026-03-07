import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Mission Control',
  description: 'Website + content mission control dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
