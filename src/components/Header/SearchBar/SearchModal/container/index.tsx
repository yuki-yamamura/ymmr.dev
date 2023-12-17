import { useSearch } from './hooks/useSearch';
import Component from '../presenter';
import { useCallback, useRef } from 'react';

type Props = {
  closeModal: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
};

const SearchModal = ({ closeModal, dialogRef }: Props) => {
  const {
    isError,
    isLoading,
    keyword,
    recentArticles,
    searchedArticles,
    resetKeyword,
    updateKeyword,
  } = useSearch();
  const displayArticles = keyword ? searchedArticles : recentArticles;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    resetKeyword();
    closeModal();
  }, [closeModal, resetKeyword]);

  const handleClearButtonClick = useCallback(() => {
    resetKeyword();
    inputRef.current?.focus();
  }, [resetKeyword]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateKeyword(e.currentTarget.value);
    },
    [updateKeyword],
  );

  return (
    <Component
      articles={displayArticles}
      inputValue={keyword}
      isError={isError}
      isLoading={isLoading}
      onClearButtonClick={handleClearButtonClick}
      onClose={handleClose}
      onChange={handleChange}
      dialogRef={dialogRef}
      inputRef={inputRef}
    />
  );
};

export default SearchModal;
