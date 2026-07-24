import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TopAnnouncementBar } from '@/components/TopAnnouncementBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TJERMIN MARKETPLACE | Andre Putera Pratama',
  description: 'Shopping Catalog built with Next.js, Redux, and TanStack Query',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900 antialiased min-h-screen flex flex-col`}>
        <Providers>
          <TopAnnouncementBar />
          <Navbar />
          <div className="flex-1 bg-white">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}