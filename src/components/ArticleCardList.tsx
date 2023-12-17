import ArticleCard from '@/components/ArticleCard';

import type { Article } from '@/types/Article';

type Props = {
  articles: Article[];
};

const ArticleCardList = ({ articles }: Props) => (
  <div className="mx-auto grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    {articles.map((article) => (
      <ArticleCard article={article} key={article.id} />
    ))}
  </div>
);

export default ArticleCardList;
