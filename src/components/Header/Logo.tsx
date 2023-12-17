import Link from 'next/link';

type Props = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const Logo = ({ onClick }: Props) => (
  <Link
    href="/"
    onClick={onClick}
    className="font-orbitron tracking-wider text-nord-6 hover:text-nord-9 focus:text-nord-9 focus-visible:outline md:text-lg"
  >
    ymmr
  </Link>
);

export default Logo;
