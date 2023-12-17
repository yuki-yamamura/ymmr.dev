import type { MicroCMSListContent } from 'microcms-js-sdk';

export type Tag = MicroCMSListContent & {
  name: string;
  count?: number;
};
