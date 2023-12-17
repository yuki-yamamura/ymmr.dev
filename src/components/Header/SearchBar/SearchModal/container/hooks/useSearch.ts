import { useRef, useState } from 'react';
import useSWR from 'swr';

import type { ResponseData } from '@/app/articles/api/route';

export const useSearch = (): {
  isError: boolean;
  isLoading: boolean;
  keyword: string;
  recentArticles: ResponseData | undefined;
  searchedArticles: ResponseData | undefined;
  resetKeyword: () => void;
  updateKeyword: (newKeyword: string) => void;
} => {
  const defaultKeyword = '';
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [isInputting, setIsInputting] = useState(false);
  const timer = useRef<NodeJS.Timer | null>(null);

  const fetcher = async (url: string) => {
    return fetch(url).then((response) => response.json());
  };
  const shouldFetchArticles = /^\S.*$/.test(keyword) && !isInputting;

  const { data: recentArticles, error: recentArticlesError } = useSWR<
    ResponseData,
    Error
  >('/articles/api?limit=5', fetcher);

  const {
    data: searchedArticles,
    error: searchedArticlesError,
    isLoading,
  } = useSWR<ResponseData, Error>(
    shouldFetchArticles ? `/articles/api?q=${keyword}` : null,
    fetcher,
  );

  const isError =
    keyword === defaultKeyword
      ? recentArticlesError !== undefined
      : searchedArticlesError !== undefined;

  const updateKeyword = (newKeyword: string) => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    setIsInputting(true);
    setKeyword(newKeyword);

    // delay 0.5 sec to reduce needless API calls.
    timer.current = setTimeout(() => {
      setIsInputting(false);
      timer.current = null;
    }, 500);
  };
  const resetKeyword = () => updateKeyword(defaultKeyword);

  return {
    isError,
    isLoading,
    keyword,
    recentArticles,
    searchedArticles,
    resetKeyword,
    updateKeyword,
  };
};
