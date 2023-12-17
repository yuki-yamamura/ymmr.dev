import Date from './Date';
import TagBadge from '@/components/TagBadge';
import { sortTagsAlphabetically } from '@/utils/tags';

import type { Article } from '@/types/Article';

type Props = {
  article: Article;
};

const ArticleHeader = ({
  article: { createdAt, tags, title, updatedAt },
}: Props) => {
  const sortedTags = sortTagsAlphabetically(tags);

  return (
    <div className="flex w-full flex-col items-center gap-y-8 md:gap-y-12">
      <div className="self-start">
        <Date createdAt={createdAt} updatedAt={updatedAt} />
      </div>
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {sortedTags.map((tag) => (
          <li key={tag.id}>
            <TagBadge size="small" tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleHeader;
