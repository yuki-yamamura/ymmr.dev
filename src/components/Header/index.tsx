'use client';

import GitHubLink from './GitHubLink';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const Header = () => {
  const scrollDirection = useScrollDirection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  };

  return (
    <header
      className={`sticky z-10 flex h-16 bg-nord-0 transition-all duration-700
        ${scrollDirection === 'down' ? '-top-16' : 'top-0'}`}
    >
      <div className="mx-auto flex w-full max-w-widest items-center justify-between gap-x-16 px-3 md:px-8">
        <Logo onClick={handleClick} />
        <div className="flex gap-x-4">
          <SearchBar />
          <GitHubLink onClick={handleClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
