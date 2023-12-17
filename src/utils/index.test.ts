import { extractDomainName, isInnerLink, toPathParameter } from '.';

describe('utils', () => {
  describe('isInnerLink', () => {
    describe('if a path starting with a slash is passed', () => {
      test('returns true', () => {
        // arrange
        const path = '/articles/title';

        // act, assert
        expect(isInnerLink(path)).toBe(true);
      });
    });

    describe('if a path starting with "http" or "https" is passed', () => {
      test('returns false', () => {
        // arrange
        const httpPath = 'http://example.com';
        const httpsPath = 'https://example.com';

        // act, assert
        expect(isInnerLink(httpPath)).toBe(false);
        expect(isInnerLink(httpsPath)).toBe(false);
      });
    });
  });

  describe('toPathParameter', () => {
    describe('if a camel-case letter is passed', () => {
      test('returns lowercase letter as a path parameter', () => {
        // arrange
        const tagName = 'GitHub';

        // act, assert
        expect(toPathParameter(tagName)).toBe('github');
      });
    });

    describe('if a letter including a whitespace is passed', () => {
      test('replaces a whitespace with a hyphen', () => {
        // arrange
        const tagName = 'CSS Modules';

        // act, assert
        expect(toPathParameter(tagName)).toBe('css-modules');
      });
    });
  });

  describe('extractDomainName', () => {
    test('returns the domain name that is taken from the passed URL', () => {
      // arrange
      const url = 'https://github.com/yuki-yamamura/ymmr.dev/issues/12345';

      // act, assert
      expect(extractDomainName(url)).toBe('github.com');
    });

    describe('if the URL contains subdomain', () => {
      test('returns its FQDN', () => {
        // arrange
        const url = 'https://www.example.com';

        // act, assert
        expect(extractDomainName(url)).toBe('www.example.com');
      });
    });
  });
});
