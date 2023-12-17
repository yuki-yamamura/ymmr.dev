import { sortTagsAlphabetically } from '.';

import type { Tag } from '@/types/Tag';

describe('tags', () => {
  describe('sortTagsAlphabetically', () => {
    test('returns tags sorted by name in ascending order', () => {
      // arrange
      const tags = [
        { name: 'Git' },
        { name: 'CSS Modules' },
        { name: 'React ' },
        { name: 'Jest' },
      ] as Tag[];

      // act, assert
      expect(sortTagsAlphabetically(tags)).toEqual([
        { name: 'CSS Modules' },
        { name: 'Git' },
        { name: 'Jest' },
        { name: 'React ' },
      ]);
    });
  });
});
