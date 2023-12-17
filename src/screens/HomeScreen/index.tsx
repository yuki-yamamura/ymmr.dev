import Navigation from './Navigation';
import TagsSection from './TagsSection';
import ArticleCardList from '@/components/ArticleCardList';
import PageTitle from '@/components/PageTitle';

import type { Article } from '@/types/Article';
import type { Tag } from '@/types/Tag';

type Props = {
  articles: Article[];
  shouldNavigateToArticlesPage: boolean;
  tags: Tag[];
};

const HomeScreen = ({
  articles,
  shouldNavigateToArticlesPage,
  tags,
}: Props) => (
  <div>
    <div className="flex justify-center pb-8 md:justify-start md:pb-12">
      <PageTitle title="Home" />
    </div>
    <main>
      <ArticleCardList articles={articles} />
    </main>
    {shouldNavigateToArticlesPage && (
      <div className="mb-10 mt-12 md:mb-20 md:mt-24">
        <Navigation />
      </div>
    )}
    <TagsSection tags={tags} />
  </div>
);

export default HomeScreen;
