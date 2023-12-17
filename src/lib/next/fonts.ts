import { Noto_Sans_JP, Orbitron } from 'next/font/google';

export const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notoSansJP',
});

export const orbitron = Orbitron({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});
