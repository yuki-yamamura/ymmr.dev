import { extractDomainName, getFaviconUrl } from '@/utils';

import type { OpenGraph } from '@/types/OpenGraph';

type Props = OpenGraph;

const LinkCard = ({ description, image, title, url }: Props) => {
  const domainName = extractDomainName(url);
  const favicon = getFaviconUrl(url, 12);

  // this JSX will be wrapped by paragraph element after being parsed by unified,
  // so use span element instead of division element to avoid an error.
  // see https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-auto flex h-36 max-w-3xl justify-between rounded border border-gray-200 bg-white no-underline hover:border-gray-400 focus:border-gray-400"
    >
      <span className="flex w-full flex-col justify-between p-4 leading-tight">
        <span className="line-clamp-2 font-bold group-hover:underline group-focus:underline">
          {title || url}
        </span>
        <span className="line-clamp-2 text-xs">{description}</span>
        <span className="flex gap-x-2">
          {domainName && favicon && (
            <>
              <img src={favicon} alt="" aria-hidden className="m-0" />
              <span className="text-xs">{domainName}</span>
            </>
          )}
        </span>
      </span>
      {image && (
        <span className="hidden max-w-[280px] shrink-0 md:inline">
          <img
            src={image}
            alt=""
            aria-hidden
            className="m-0 h-full w-full rounded-r object-cover"
          />
        </span>
      )}
    </a>
  );
};

export default LinkCard;
