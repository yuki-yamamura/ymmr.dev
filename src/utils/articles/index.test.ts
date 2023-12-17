jest.mock('@/lib/microcms/articles', () => {
  return {
    __esModule: true,
    getArticles: jest.fn(),
  };
});

import {
  createPageNumbers,
  getArticlesByTagName,
  getNextArticle,
  getPreviousArticle,
} from '.';
import { getArticles } from '@/lib/microcms/articles';

import type { Article } from '@/types/Article';

describe('articles', () => {
  describe('createPageNumbers', () => {
    test('returns an empty array if the total articles is 0', () => {
      expect(createPageNumbers(0)).toEqual([]);
    });

    test('returns an array of page numbers depending on the total number of articles', () => {
      expect(createPageNumbers(12)).toEqual([1]);
      expect(createPageNumbers(13)).toEqual([1, 2]);
      // expect(createPageNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('getArticlesByTagName', () => {
    describe('if an original tag name is passed', () => {
      test('returns an array of articles having the same tag name', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
            tags: [{ name: 'tag A' }],
          },
          {
            id: 'b',
            tags: [{ name: 'tag B' }],
          },
        ];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getArticlesByTagName('tag A');

        // assert
        expect(actual).toEqual([
          {
            id: 'a',
            tags: [{ name: 'tag A' }],
          },
        ]);
      });
    });

    describe('if a tag name formatted as a path parameter is passed', () => {
      test('returns an array of articles having the same tag name as a path parameter', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
            tags: [{ name: 'tag A' }],
          },
          {
            id: 'b',
            tags: [{ name: 'tag B' }],
          },
        ];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getArticlesByTagName('tag-b');

        // asset
        expect(actual).toEqual([
          {
            id: 'b',
            tags: [{ name: 'tag B' }],
          },
        ]);
      });
    });
  });

  describe('getNextArticle', () => {
    describe('if the article is not the latest one', () => {
      test('return the article just written after it', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ] as Article[];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getNextArticle(fakeArticles[1]);

        // assert
        expect(actual).toEqual({
          id: 'a',
        });
      });
    });

    describe('if the article is the latest one', () => {
      test('returns undefined because there is no article newer than it', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ] as Article[];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getNextArticle(fakeArticles[0]);

        // assert
        expect(actual).toBeUndefined();
      });
    });
  });

  describe('getPreviousArticle', () => {
    describe('if the article is not the first one', () => {
      test('return the article just written before it', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ] as Article[];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getPreviousArticle(fakeArticles[0]);

        // assert
        expect(actual).toEqual({
          id: 'b',
        });
      });
    });

    describe('if the article is the first one', () => {
      test('returns undefined because there is no article older than it', async () => {
        // arrange
        const fakeArticles = [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ] as Article[];
        (getArticles as jest.Mock).mockResolvedValue(fakeArticles);

        // act
        const actual = await getPreviousArticle(fakeArticles[1]);

        // assert
        expect(actual).toBeUndefined();
      });
    });
  });
});
