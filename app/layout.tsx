// app/layout.tsx

import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Roame — Plan Your Perfect Trip',
  description: 'Roame is your free AI-powered travel planner. Get a beautiful itinerary in seconds.',
  keywords: ['travel', 'trip planner', 'AI itinerary', 'vacation ideas', 'Roame'],
  authors: [{ name: 'Owen Saville' }],
  creator: 'Roame',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="flex items-center justify-center py-6">
          <Link href="/">
            <Image src="/logo.png" alt="Roame Logo" width={150} height={50} />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
} 
