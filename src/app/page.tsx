import { author } from '@/constants/author';
import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import { getTags } from '@/lib/microcms/tags';
import HomeScreen from '@/screens/HomeScreen';
import { getArticlesByTagName } from '@/utils/articles';
import { sortTagsAlphabetically } from '@/utils/tags';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: author.name,
  description: author.bio,
};

const Page = async () => {
  const allArticles = await getArticles();
  const totalArticles = allArticles.length;
  const articlesOnPage = allArticles.slice(0, MAX_ARTICLES_COUNT_PER_PAGE);
  const allTags = sortTagsAlphabetically(
    await Promise.all(
      (await getTags()).map(async (tag) => {
        const articles = await getArticlesByTagName(tag.name);
        const count = articles.length;

        return { ...tag, count };
      }),
    ),
  );
  const shouldNavigateToArticlesPage =
    MAX_ARTICLES_COUNT_PER_PAGE < totalArticles;

  return (
    <HomeScreen
      articles={articlesOnPage}
      shouldNavigateToArticlesPage={shouldNavigateToArticlesPage}
      tags={allTags}
    />
  );
};

export default Page;
