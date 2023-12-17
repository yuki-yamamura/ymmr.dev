import Badge from '@/components/Badge';
import { toPathParameter } from '@/utils';
import Link from 'next/link';

import type { Tag } from '@/types/Tag';

type Props = {
  size: 'small' | 'base' | 'large';
  tag: Tag;
};

const TagBadge = ({ size, tag }: Props) => {
  const { count, name } = tag;
  const pathParameter = toPathParameter(name);
  const hasCount = count !== undefined && count > 0;

  return (
    <div className="group relative">
      <Link
        href={`/tags/${pathParameter}`}
        className="group-hover:opacity-80 group-focus:opacity-80"
      >
        <Badge name={pathParameter} size={size} />
      </Link>
      {hasCount && (
        <span
          aria-hidden
          className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-nord-10 text-xs text-white"
        >
          {tag.count}
        </span>
      )}
    </div>
  );
};

export default TagBadge;
