import { formatDate } from '@/lib/dayjs';
import Link from 'next/link';

import type { Article } from '@/types/Article';

type Props = {
  article: Article;
  relation: 'previous' | 'next';
};

const RelatedArticleCard = ({
  article: { id, publishedAt, title, updatedAt },
  relation,
}: Props) => (
  <Link
    href={`/articles/${id}`}
    className="group basis-1/2 rounded-xl bg-white px-6 py-4 drop-shadow"
  >
    <div className="flex h-full flex-col gap-y-4">
      <div className="text-sm">{formatDate(publishedAt ?? updatedAt)}</div>
      <h2 className="line-clamp-2 grow group-visited:text-nord-15 group-hover:underline group-focus:underline">
        {title}
      </h2>
      <div
        className={`text-sm text-gray-400 ${
          relation === 'previous' ? 'text-start' : 'text-end'
        }`}
      >
        {relation === 'previous' ? '← 前の記事' : '次の記事 →'}
      </div>
    </div>
  </Link>
);

export default RelatedArticleCard;
