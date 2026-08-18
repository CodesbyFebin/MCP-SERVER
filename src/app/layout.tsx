import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClaimGuard } from '@/components/ClaimGuard';
import { SITE } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: 'Evidence-backed Model Context Protocol directory and developer platform.',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#030508] text-slate-200 antialiased">
        <ClaimGuard>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </ClaimGuard>
      </body>
    </html>
  );
}
