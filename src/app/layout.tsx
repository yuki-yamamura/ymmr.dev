import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { notoSansJP, orbitron } from '@/lib/next/fonts';
import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: '/assets/images/favicon.ico',
      sizes: '48x48',
    },
    {
      rel: 'icon',
      url: '/assets/images/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <html lang="ja" className={`${notoSansJP.variable} ${orbitron.variable}`}>
    <head>
      {/* prefetch the recent 5 articles for placeholder in search modal */}
      <link
        rel="preload"
        href="/articles/api?limit=5"
        as="fetch"
        crossOrigin="anonymous"
      />
    </head>
    <body className="flex min-h-screen flex-col bg-nord-6 text-nord-3">
      <Header />
      <div className="mx-auto flex w-full max-w-widest grow flex-col px-4 py-10 md:px-8 md:py-20">
        {children}
      </div>
      <Footer />
      <Analytics />
    </body>
  </html>
);

export default Layout;
