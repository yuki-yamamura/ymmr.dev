import LinkCard from './LinkCard';
import { isInnerLink } from '@/utils';
import Link from 'next/link';

import type { OpenGraph } from '@/types/OpenGraph';

export type CustomLinkProps = Partial<OpenGraph> & {
  href: string;
  children: string;
};

const CustomLink = ({
  children,
  description,
  href,
  image,
  title,
  url,
}: CustomLinkProps) => {
  // if url is defined, that link should be treated as a card.
  if (url !== undefined) {
    return <LinkCard {...{ description, image, title, url }} />;
  }

  // otherwise that should be an inline link.
  if (isInnerLink(href)) {
    return (
      <Link
        href={href}
        className="text-nord-10 no-underline hover:underline focus:underline"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="text-nord-10 no-underline hover:underline focus:underline"
    >
      {children}
    </a>
  );
};

export default CustomLink;
