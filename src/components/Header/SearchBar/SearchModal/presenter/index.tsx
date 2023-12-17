import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineDocument } from 'react-icons/hi';
import { MdOutlineClear } from 'react-icons/md';

import type { ResponseData } from '@/app/articles/api/route';

type Props = {
  articles: ResponseData | undefined;
  inputValue: string;
  isError: boolean;
  isLoading: boolean;
  onClearButtonClick: () => void;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const Component = ({
  articles,
  inputValue,
  isError,
  isLoading,
  onClearButtonClick,
  onClose,
  onChange,
  dialogRef,
  inputRef,
}: Props) => {
  const searchIcon = isLoading ? (
    <AiOutlineLoading3Quarters
      aria-hidden
      className="mt-1 h-4 w-4 animate-spin fill-gray-400"
    />
  ) : (
    <BiSearch aria-hidden className="mt-1 h-5 w-5 fill-gray-400" />
  );
  const shouldRenderArticles = articles !== undefined && articles.length !== 0;
  const title = isError
    ? '記事を取得できませんでした。時間をおいてから接続してください。'
    : inputValue
    ? `${articles?.length ?? 0} results`
    : 'Recent Articles';

  return (
    <Modal dialogRef={dialogRef} onClose={onClose}>
      <div className="flex h-14 w-full items-center px-4">
        {searchIcon}
        {/* input area */}
        <input
          value={inputValue}
          placeholder="キーワードで記事を検索"
          role="search"
          ref={inputRef}
          onChange={onChange}
          className="grow pl-6 text-gray-500 placeholder-gray-400 focus:outline-none"
        />
        {inputValue && (
          <button
            type="button"
            onClick={onClearButtonClick}
            className="rounded p-1 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <MdOutlineClear
              aria-label="clear input value"
              className="h-5 w-5 fill-gray-400"
            />
          </button>
        )}
      </div>
      {/* search results */}
      <div className="max-h-72 overflow-auto p-4">
        <div
          className={`text-sm text-gray-400 xs:text-xs ${
            shouldRenderArticles ? 'pb-4' : ''
          }`}
        >
          {title}
        </div>
        <ul role="group" className="flex flex-col xs:text-sm">
          {shouldRenderArticles &&
            articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/articles/${article.id}`}
                  onClick={onClose}
                  className="flex items-center gap-x-3 rounded p-2 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <HiOutlineDocument className="h-4 w-4 shrink-0" />
                  <span>{article.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {/* footer */}
      <div className="flex h-14 items-center justify-center">
        <button
          type="button"
          aria-label="close search modal"
          onClick={onClose}
          className="rounded p-1 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
        >
          <AiOutlineClose aria-hidden className="h-4 w-4 fill-gray-400" />
        </button>
      </div>
    </Modal>
  );
};

export default Component;
