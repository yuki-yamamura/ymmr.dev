import {
  SITE_URL as baseUrl,
  MAX_ARTICLES_COUNT_PER_PAGE,
} from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import { getTags } from '@/lib/microcms/tags';
import { toPathParameter } from '@/utils';
import { createPageNumbers, getArticlesByTagName } from '@/utils/articles';
import path from 'path';

import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const paths: MetadataRoute.Sitemap = [];

  // route for <baseUrl>
  paths.push({ url: baseUrl });

  // routes for <baseUrl>/articles/<id>
  const allArticles = await getArticles();
  paths.push(
    ...allArticles
      .map((article) => article.id)
      .map((id) => new URL(path.join('articles', id), baseUrl).href)
      .map((url) => ({ url })),
  );

  // routes for <baseUrl>/articles or <baseUrl>/articles/page/<pageNumber>
  if (MAX_ARTICLES_COUNT_PER_PAGE < allArticles.length) {
    const pageNumbers = createPageNumbers(allArticles.length);
    paths.push(
      ...pageNumbers
        .map(
          (pageNumber) =>
            new URL(
              path.join('articles', 'page', pageNumber.toString()),
              baseUrl,
            ).href,
        )
        .map((url) => ({ url })),
    );
  } else {
    paths.push({ url: new URL('articles', baseUrl).href });
  }

  // routes for <baseUrl>/tags/<tagName> or <baseUrl>tags/<tagName>/page/<pageNumber>
  const allTags = await getTags();
  for (const tag of allTags) {
    const tagName = toPathParameter(tag.name);
    const articles = await getArticlesByTagName(tagName);
    if (MAX_ARTICLES_COUNT_PER_PAGE < articles.length) {
      const pageNumbers = createPageNumbers(articles.length);
      paths.push(
        ...pageNumbers
          .map(
            (pageNumber) =>
              new URL(
                path.join('tags', tagName, 'page', pageNumber.toString()),
                baseUrl,
              ).href,
          )
          .map((url) => ({ url })),
      );
    } else {
      paths.push({ url: new URL(path.join('tags', tagName), baseUrl).href });
    }
  }

  return paths;
};

export default sitemap;
