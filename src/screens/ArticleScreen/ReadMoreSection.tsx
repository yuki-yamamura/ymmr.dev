import RelatedArticleCard from '@/components/RelatedArticleCard';
import Section from '@/components/Section';

import type { Article } from '@/types/Article';

type Props = {
  nextArticle: Article | undefined;
  previousArticle: Article | undefined;
};

const CommentsSection = ({ nextArticle, previousArticle }: Props) => (
  <Section title="Read more">
    <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
      {previousArticle && (
        <RelatedArticleCard article={previousArticle} relation="previous" />
      )}
      {nextArticle && (
        <RelatedArticleCard article={nextArticle} relation="next" />
      )}
    </div>
  </Section>
);

export default CommentsSection;
