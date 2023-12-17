import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import ArticleListScreen from '@/screens/ArticleListScreen';
import { createPageNumbers } from '@/utils/articles';
import { notFound } from 'next/navigation';

type Params = {
  pageNumber: string;
};

type Props = {
  params: Params;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const articles = await getArticles();
  const totalArticles = articles.length;
  const pageNumbers = createPageNumbers(totalArticles);

  if (MAX_ARTICLES_COUNT_PER_PAGE < totalArticles) {
    return pageNumbers.map((pageNumber) => ({
      pageNumber: pageNumber.toString(),
    }));
  }

  return [];
};

const Page = async ({ params }: Props) => {
  const pageNumber = parseInt(params.pageNumber);
  const allArticles = await getArticles();
  const totalArticles = allArticles.length;
  const pageNumbers = createPageNumbers(totalArticles);

  if (!pageNumbers.includes(pageNumber)) {
    notFound();
  }

  const articlesOnPage = allArticles.slice(
    (pageNumber - 1) * MAX_ARTICLES_COUNT_PER_PAGE,
    pageNumber * MAX_ARTICLES_COUNT_PER_PAGE,
  );
  const paginationProps =
    MAX_ARTICLES_COUNT_PER_PAGE < totalArticles
      ? {
          baseUrl: '/articles/page',
          currentPageNumber: pageNumber,
          totalArticles,
        }
      : undefined;

  return (
    <ArticleListScreen
      articles={articlesOnPage}
      paginationProps={paginationProps}
      title="Articles"
    />
  );
};

export default Page;
