import { MICROCMS_CONTENTS_LIMIT } from '@/constants/siteConfig';
import { client } from '@/lib/microcms';

import type { Tag } from '@/types/Tag';
import type { GetListRequest, MicroCMSQueries } from 'microcms-js-sdk';

const defaultRequest = {
  endpoint: 'tags',
  customRequestInit: {
    next: {
      tags: ['microcms'],
    },
  },
};

/**
 * A recursive function to fetch tags from microCMS
 * @see https://document.microcms.io/content-api/get-list-contents
 */
export const getTags = async (
  queries: Required<Pick<MicroCMSQueries, 'offset'>> &
    Omit<MicroCMSQueries, 'offset'> = { offset: 0 },
): Promise<Tag[]> => {
  const request: GetListRequest = {
    ...defaultRequest,
    queries: {
      limit: MICROCMS_CONTENTS_LIMIT,
      ...queries,
    },
  };
  const data = await client.getList<Tag>(request);

  const nextLimit = queries.limit
    ? queries.limit - MICROCMS_CONTENTS_LIMIT
    : MICROCMS_CONTENTS_LIMIT;
  const nextOffset = queries.offset + MICROCMS_CONTENTS_LIMIT;

  // base condition
  // if the offset reaches the end of the tags, stop recursive call.
  if (
    data.totalCount < nextOffset ||
    (queries.limit && queries.limit <= MICROCMS_CONTENTS_LIMIT)
  ) {
    return data.contents;
  }

  // recursive call
  const nextTags = await getTags({
    ...queries,
    limit: nextLimit,
    offset: nextOffset,
  });

  return data.contents.concat(nextTags);
};
