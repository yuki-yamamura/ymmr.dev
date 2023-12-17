import type { Tag } from '@/types/Tag';
import type { MicroCMSListContent } from 'microcms-js-sdk';

export type Article = MicroCMSListContent & {
  body: string;
  description: string;
  tags: Tag[];
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};
