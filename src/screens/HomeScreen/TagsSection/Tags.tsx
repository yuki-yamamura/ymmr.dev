import TagBadge from '@/components/TagBadge';

import type { Tag } from '@/types/Tag';

type Props = {
  tags: Tag[];
};

const Tags = ({ tags }: Props) => (
  <ul className="flex flex-wrap justify-start gap-x-6 gap-y-2">
    {tags.map((tag) => (
      <li key={tag.id}>
        <TagBadge size="small" tag={tag} />
      </li>
    ))}
  </ul>
);

export default Tags;
