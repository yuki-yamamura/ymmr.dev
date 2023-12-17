import Badge from '@/components/Badge';
import { formatDate } from '@/lib/dayjs';
import { toPathParameter } from '@/utils';
import { sortTagsAlphabetically } from '@/utils/tags';
import Link from 'next/link';

import type { Article } from '@/types/Article';

type Props = {
  article: Article;
};

const ArticleCard = ({
  article: { description, id, publishedAt, tags, title, thumbnail, updatedAt },
}: Props) => {
  const date = formatDate(publishedAt ?? updatedAt);
  const sortedTagNames = sortTagsAlphabetically(tags).map((tag) =>
    toPathParameter(tag.name),
  );

  return (
    <Link href={`/articles/${id}`} className="group">
      <div className="flex h-full flex-col rounded-xl bg-white px-3 py-6 drop-shadow md:px-6 md:py-6">
        <div className="text-sm">{date}</div>
        <img
          src={thumbnail.url}
          alt=""
          className="mx-auto h-[200px] w-[200px] group-hover:opacity-50"
        />
        <h2 className="py-3 text-lg font-bold text-nord-10 group-visited:text-nord-15 group-hover:underline xs:text-lg">
          {title}
        </h2>
        <div className="my-1 mb-3 line-clamp-3 py-1 text-sm">{description}</div>
        <ul className="flex w-full flex-grow flex-wrap items-end gap-x-4 gap-y-2 whitespace-nowrap">
          {sortedTagNames.map((tagName) => (
            <li key={tagName} className="text-nord-10">
              <Badge name={tagName} size="small" />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default ArticleCard;
