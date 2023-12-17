import ArticleCardList from '@/components/ArticleCardList';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';

import type { PaginationProps } from '@/components/Pagination';
import type { Article } from '@/types/Article';

type Props = {
  articles: Article[];
  paginationProps?: PaginationProps;
  title: string;
};

const ArticleListScreen = ({ title, articles, paginationProps }: Props) => (
  <div>
    <div className="flex justify-center pb-8 md:justify-start md:pb-12">
      <PageTitle title={title} />
    </div>
    <main>
      <ArticleCardList articles={articles} />
    </main>
    {paginationProps && (
      <div className="mt-12 md:mt-24">
        <Pagination {...paginationProps} />
      </div>
    )}
  </div>
);

export default ArticleListScreen;
