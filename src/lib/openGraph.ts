import ogs from 'open-graph-scraper';
import { cache } from 'react';

import type { OpenGraph } from '@/types/OpenGraph';

// revalidate about every month (60 secs * 60 mins * 24 hours * 30 days).
export const revalidate = 2592000;

export const getOpenGraph = cache(async (url: string): Promise<OpenGraph> => {
  const {
    result: { success, ogDescription, ogImage, ogTitle },
  } = await ogs({ url });

  if (!success) {
    return {
      url,
      description: undefined,
      image: undefined,
      title: undefined,
    };
  }

  return {
    url,
    description: ogDescription,
    image: ogImage?.at(0)?.url,
    title: ogTitle,
  };
});
