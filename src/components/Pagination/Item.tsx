import Link from 'next/link';

type Props = {
  displayText: string;
  href: string;
  status: 'enabled' | 'disabled' | 'current';
};

const Item = ({ displayText, href, status }: Props) => (
  <Link
    href={href}
    aria-current={status === 'current'}
    aria-disabled={status !== 'enabled'}
    className={`rounded bg-nord-6 px-2 py-1 hover:bg-nord-5 focus:bg-nord-5 ${
      status === 'current' ? 'border border-nord-3' : ''
    } ${status === 'disabled' ? 'text-gray-400' : ''} ${
      status === 'disabled' || status === 'current' ? 'pointer-events-none' : ''
    }`}
  >
    {displayText}
  </Link>
);

export default Item;
