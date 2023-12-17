import { getArticleById } from '@/lib/microcms/articles';
import ArticleScreen from '@/screens/ArticleScreen';
import { getPreviousArticle } from '@/utils/articles';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    draftKey: string | undefined;
  };
};

export const revalidate = 0;

const Page = async ({ params: { id }, searchParams: { draftKey } }: Props) => {
  if (draftKey === undefined) {
    notFound();
  }
  const draftArticle = await getArticleById(id, { draftKey });

  if (draftArticle === null) {
    notFound();
  }

  const previousArticle = await getPreviousArticle(draftArticle);
  const nextArticle = undefined;

  return (
    <ArticleScreen
      article={draftArticle}
      nextArticle={nextArticle}
      previousArticle={previousArticle}
    />
  );
};

export default Page;
