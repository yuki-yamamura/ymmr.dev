import { useEffect, useState } from 'react';

type ScrollDirection = 'down' | 'up';

export const useScrollDirection = (): ScrollDirection | null => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      setScrollDirection(lastScrollY < currentScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    document.addEventListener('scroll', updateScrollDirection);

    return () => document.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
};
