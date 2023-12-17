import Item from './Item';
import { MAX_ARTICLES_COUNT_PER_PAGE } from '@/constants/siteConfig';
import path from 'path';

const DISPLAY_PAGE_COUNT = 5;

export type PaginationProps = {
  baseUrl: string;
  currentPageNumber: number;
  totalArticles: number;
};

const Pagination = ({
  baseUrl,
  currentPageNumber,
  totalArticles,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalArticles / MAX_ARTICLES_COUNT_PER_PAGE);
  const startPageNumber = Math.max(
    1,
    currentPageNumber -
      (DISPLAY_PAGE_COUNT - 1) +
      Math.min(
        Math.floor(DISPLAY_PAGE_COUNT / 2),
        totalPages - currentPageNumber,
      ),
  );
  const displayPageNumbers = Array.from(
    new Array(totalPages),
    (_, i) => i + 1,
  ).splice(startPageNumber - 1, DISPLAY_PAGE_COUNT);

  return (
    <nav>
      <ul className="flex items-center justify-center gap-x-4">
        <li key="previous page">
          <Item
            href={path.join(baseUrl, `${currentPageNumber - 1}`)}
            displayText="←"
            status={currentPageNumber === 1 ? 'disabled' : 'enabled'}
          />
        </li>
        {displayPageNumbers.map((pagePageNumber) => (
          <li key={pagePageNumber}>
            <Item
              href={path.join(baseUrl, pagePageNumber.toString())}
              displayText={pagePageNumber.toString()}
              status={
                pagePageNumber === currentPageNumber ? 'current' : 'enabled'
              }
            />
          </li>
        ))}
        <li key="next page">
          <Item
            href={path.join(baseUrl, `${currentPageNumber + 1}`)}
            displayText="→"
            status={currentPageNumber === totalPages ? 'disabled' : 'enabled'}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
