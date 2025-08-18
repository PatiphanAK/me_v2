import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Molecules/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strongest Prehistoric',
  description: 'Welcome to my portfolio website.',
  keywords: ['portfolio', 'web developer', 'typescript', 'nextjs', 'dinosaur'],
  authors: [{ name: 'Patiphan Akkahadsri' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-green-50 to-yellow-50 antialiased`}>
        <Navbar />
        <div className="relative min-h-screen">
          {children}
        </div>
        <footer className="bg-green-900 text-green-100 py-8 text-center">
          <div className="flex justify-center items-center space-x-2">
          </div>
        </footer>
      </body>
    </html>
  );
}