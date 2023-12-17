import { client } from './';
import { MICROCMS_CONTENTS_LIMIT } from '@/constants/siteConfig';

import type { Article } from '@/types/Article';
import type {
  GetListDetailRequest,
  GetListRequest,
  MicroCMSQueries,
} from 'microcms-js-sdk';

const defaultRequest = {
  endpoint: 'articles',
  customRequestInit: {
    next: {
      tags: ['microcms'],
    },
  },
};

export const getArticleById = async (
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<Article | null> => {
  const request: GetListDetailRequest = {
    ...defaultRequest,
    contentId,
    queries,
  };

  try {
    const article = await client.getListDetail<Article>(request);

    return article;
  } catch (error) {
    if ((error as Error).message.includes('404')) {
      return null;
    }

    throw error;
  }
};

/**
 * A recursive function to fetch articles from microCMS
 * @see https://document.microcms.io/content-api/get-list-contents
 */
export const getArticles = async (
  queries: Required<Pick<MicroCMSQueries, 'offset'>> &
    Omit<MicroCMSQueries, 'offset'> = {
    offset: 0,
  },
): Promise<Article[]> => {
  const request: GetListRequest = {
    ...defaultRequest,
    queries: {
      limit: MICROCMS_CONTENTS_LIMIT,
      orders: '-publishedAt',
      ...queries,
    },
  };
  const data = await client.getList<Article>(request);

  const nextLimit =
    queries.limit && queries.limit !== MICROCMS_CONTENTS_LIMIT
      ? queries.limit - MICROCMS_CONTENTS_LIMIT
      : MICROCMS_CONTENTS_LIMIT;
  const nextOffset = queries.offset + MICROCMS_CONTENTS_LIMIT;

  // base condition
  // if the offset reaches the end of the articles, stop recursive call.
  if (
    data.totalCount <= nextOffset ||
    (queries.limit && queries.limit < MICROCMS_CONTENTS_LIMIT)
  ) {
    return data.contents;
  }

  // recursive call
  const nextArticles = await getArticles({
    ...queries,
    limit: nextLimit,
    offset: nextOffset,
  });

  return data.contents.concat(nextArticles);
};
