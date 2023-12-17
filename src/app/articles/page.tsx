import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import ArticleListScreen from '@/screens/ArticleListScreen';
import { redirect } from 'next/navigation';

const Page = async () => {
  const allArticles = await getArticles();

  if (MAX_ARTICLES_COUNT_PER_PAGE < allArticles.length) {
    redirect('/articles/page/1');
  }

  return <ArticleListScreen title="Articles" articles={allArticles} />;
};

export default Page;
