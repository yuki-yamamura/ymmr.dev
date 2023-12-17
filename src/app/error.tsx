'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: [
    { rel: 'icon', url: '/assets/images/favicon.ico' },
    {
      rel: 'icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

const Error = () => (
  <main className="flex grow flex-col items-center justify-center">
    <div className="relative flex flex-col items-center gap-y-4">
      <img
        src="https://images.microcms-assets.io/assets/b74750f44e5244679bf32745a2990f2d/81e576e91e9642e889c7f6fc7b21ac28/cup-of-coffee.png"
        alt="cup of coffee"
        height="260"
        width="260"
      />
      <h1 className="font-orbitron text-2xl tracking-wide">
        500 Internal Server Error
      </h1>
      <div>時間をおいてから接続してください。</div>
    </div>
  </main>
);

export default Error;
