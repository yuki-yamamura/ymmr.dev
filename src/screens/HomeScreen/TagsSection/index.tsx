import Tags from './Tags';
import Section from '@/components/Section';

import type { Tag } from '@/types/Tag';

type Props = {
  tags: Tag[];
};

const TagsSection = ({ tags }: Props) => (
  <Section title="Tags">
    <Tags tags={tags} />
  </Section>
);

export default TagsSection;
