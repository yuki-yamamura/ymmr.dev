import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'ページが見つかりませんでした。',
  icons: [
    { rel: 'icon', url: '/assets/images/favicon.ico' },
    {
      rel: 'icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

const NotFound = () => (
  <main className="flex grow flex-col items-center justify-center">
    <div className="relative flex flex-col items-center gap-y-4">
      <img
        src="https://images.microcms-assets.io/assets/b74750f44e5244679bf32745a2990f2d/d391f26c4a7a414eaae0d0724bf6db65/lost-the-way.png"
        alt="lost the way"
        height="260"
        width="260"
      />
      <h1 className="font-orbitron text-2xl tracking-wide">404 Not Found</h1>
      <Link href="/" className="text-nord-10 hover:underline focus:underline">
        ← ホームに戻る
      </Link>
    </div>
  </main>
);

export default NotFound;
