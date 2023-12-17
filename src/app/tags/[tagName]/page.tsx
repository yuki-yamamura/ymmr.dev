import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import ArticleListScreen from '@/screens/ArticleListScreen';
import { getArticlesByTagName } from '@/utils/articles';
import { notFound, redirect } from 'next/navigation';

import type { Params } from './layout';

type Props = {
  params: Params;
};

const Page = async ({ params: { tagName } }: Props) => {
  const articles = await getArticlesByTagName(tagName);
  const totalArticles = articles.length;

  if (totalArticles === 0) {
    notFound();
  }

  if (MAX_ARTICLES_COUNT_PER_PAGE < totalArticles) {
    redirect(`/tags/${tagName}/page/1`);
  }

  return <ArticleListScreen title={tagName} articles={articles} />;
};

export default Page;
