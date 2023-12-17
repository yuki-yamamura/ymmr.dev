import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import { toPathParameter } from '@/utils';

import type { Article } from '@/types/Article';

export const createPageNumbers = (totalArticles: number): number[] => {
  const totalPages = Math.ceil(totalArticles / MAX_ARTICLES_COUNT_PER_PAGE);

  return Array.from(new Array(totalPages), (_, index) => index + 1);
};

export const getArticlesByTagName = async (
  tagName: string,
): Promise<Article[]> => {
  const allArticles = await getArticles();

  // this function is supposed to receive an original tag name or its representation for a path parameter,
  // so use the same path parameter form during comparison.
  return allArticles.filter((article) =>
    article.tags
      .map((tag) => toPathParameter(tag.name))
      .includes(toPathParameter(tagName)),
  );
};

export const getNextArticle = async (
  article: Article,
): Promise<Article | undefined> => {
  const allArticles = await getArticles();
  const index = allArticles.findIndex(({ id }) => id === article.id);

  return index === 0 ? undefined : allArticles.at(index - 1);
};

export const getPreviousArticle = async (
  article: Article,
): Promise<Article | undefined> => {
  const allArticles = await getArticles();
  const index = allArticles.findIndex(({ id }) => id === article.id);

  return index === allArticles.length ? undefined : allArticles.at(index + 1);
};
