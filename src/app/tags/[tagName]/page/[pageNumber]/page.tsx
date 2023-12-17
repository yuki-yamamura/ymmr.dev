import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import ArticleListScreen from '@/screens/ArticleListScreen';
import { createPageNumbers, getArticlesByTagName } from '@/utils/articles';
import { notFound } from 'next/navigation';

import type { Params as ParentParams } from '../../layout';

type Params = {
  pageNumber: string;
};

type Props = {
  params: ParentParams & Params;
};

export const generateStaticParams = async ({
  params,
}: {
  params: ParentParams;
}): Promise<Params[]> => {
  const { tagName } = params;
  const articles = await getArticlesByTagName(tagName);
  const totalArticles = articles.length;
  const pageNumbers = createPageNumbers(articles.length);

  if (MAX_ARTICLES_COUNT_PER_PAGE < totalArticles) {
    return pageNumbers.map((pageNumber) => ({
      pageNumber: pageNumber.toString(),
    }));
  }

  return [];
};

const Page = async ({ params }: Props) => {
  const pageNumber = parseInt(params.pageNumber);
  const { tagName } = params;
  const articles = await getArticlesByTagName(tagName);
  const totalArticles = articles.length;
  const pageNumbers = createPageNumbers(totalArticles);

  if (!pageNumbers.includes(pageNumber)) {
    notFound();
  }

  const articlesOnPage = articles.slice(
    (pageNumber - 1) * MAX_ARTICLES_COUNT_PER_PAGE,
    pageNumber * MAX_ARTICLES_COUNT_PER_PAGE,
  );
  const paginationProps =
    MAX_ARTICLES_COUNT_PER_PAGE < totalArticles
      ? {
          baseUrl: `/tags/${tagName}/page`,
          currentPageNumber: pageNumber,
          totalArticles,
        }
      : undefined;

  return (
    <ArticleListScreen
      articles={articlesOnPage}
      paginationProps={paginationProps}
      title={tagName}
    />
  );
};

export default Page;
