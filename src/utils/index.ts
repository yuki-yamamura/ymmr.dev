export const isInnerLink = (path: string): boolean => {
  return path.startsWith('/');
};

export const toPathParameter = (tagName: string): string => {
  // for example, from GitHub to github.
  return tagName.replace(/\s+/g, '-').toLowerCase();
};

export const extractDomainName = (url: string): string | undefined => {
  return url.match(/https?:\/\/(.+?)(\/|$)/)?.[1];
};

/**
 * A function to get a favicon on any website
 * @returns the Google APi URL to get a favicon
 * @see https://dev.to/derlin/get-favicons-from-any-website-using-a-hidden-google-api-3p1e
 */
export const getFaviconUrl = (
  url: string,
  size: number,
): `https://www.google.com/s2/favicons?domain=${string}&sz=${number}` => {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url,
  )}&sz=${size}`;
};
