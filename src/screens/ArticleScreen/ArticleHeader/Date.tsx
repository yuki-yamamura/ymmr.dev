import { formatDate } from '@/lib/dayjs';

import type { Article } from '@/types/Article';

type Props = Pick<Article, 'createdAt' | 'updatedAt'>;

const Date = ({ createdAt, updatedAt }: Props) => {
  const displayDate = formatDate(createdAt ?? updatedAt);

  return <div className="text-gray-500">公開日: {displayDate}</div>;
};

export default Date;
