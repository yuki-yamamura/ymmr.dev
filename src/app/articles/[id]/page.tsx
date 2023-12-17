import { getArticleById, getArticles } from '@/lib/microcms/articles';
import ArticleScreen from '@/screens/ArticleScreen';
import { getNextArticle, getPreviousArticle } from '@/utils/articles';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export type Params = {
  id: string;
};
type Props = {
  params: Params;
};

export const generateStaticParams = (): Promise<Params[]> => {
  return getArticles().then((articles) => articles.map(({ id }) => ({ id })));
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const article = await getArticleById(id);
  if (article === null) {
    notFound();
  }
  const { description, title } = article;

  return { description, title };
};

const Page = async ({ params: { id } }: Props) => {
  const article = await getArticleById(id);
  if (article === null) {
    notFound();
  }

  const previousArticle = await getPreviousArticle(article);
  const nextArticle = await getNextArticle(article);

  return (
    <ArticleScreen
      article={article}
      nextArticle={nextArticle}
      previousArticle={previousArticle}
    />
  );
};

export default Page;
