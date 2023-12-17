import SearchModal from './SearchModal/container';
import { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dialogRef.current?.close();
    inputRef.current?.blur();
  };
  const handleClick = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div role="button" className="relative h-10">
        <input
          readOnly
          placeholder="Search..."
          className="h-full w-full rounded bg-nord-1 pl-12 pr-6 placeholder-gray-400 hover:cursor-pointer focus-visible:outline active:outline-none"
          onClick={handleClick}
          ref={inputRef}
        />
        <BiSearch
          aria-hidden
          className="absolute left-[14px] top-3 h-5 w-5 fill-gray-400"
        />
      </div>
      <SearchModal closeModal={closeModal} dialogRef={dialogRef} />
    </>
  );
};

export default SearchBar;
