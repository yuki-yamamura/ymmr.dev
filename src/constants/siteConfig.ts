import { author } from '@/constants/author';

export const MAX_ARTICLES_COUNT_PER_PAGE = 12;

export const MICROCMS_CONTENTS_LIMIT = 10;

export const SITE_URL = 'https://ymmr.dev';

export const giscus = {
  repository: `${author.github}/ymmr.dev`,
  repositoryId: 'R_kgDOK6mxWw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOK6mxW84CbzaI',
} as const;
