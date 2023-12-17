import type { Tag } from '@/types/Tag';

export const sortTagsAlphabetically = (tags: Tag[]): Tag[] => {
  return tags.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
