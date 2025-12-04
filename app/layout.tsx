import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Foundation',
  description: 'Die Plattform für Navi – die KI-gestützte Gesundheitsbegleitung',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-secondary text-gray-800 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}