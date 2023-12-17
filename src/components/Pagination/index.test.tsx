import Pagination from '.';
import { render, screen } from '@testing-library/react';

describe('renders correct number of pagination items depending on the amount of articles', () => {
  test('should render two links navigating to page 1 and 2 if there are 24 numbers of articles', () => {
    // arrange
    const totalArticles = 24;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={1}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(2);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
  });

  test('should render links navigating to page 1 to 5 if there are 60 numbers of articles', () => {
    // arrange
    const totalArticles = 60;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={1}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
    expect(results[2]).toHaveTextContent('3');
    expect(results[3]).toHaveTextContent('4');
    expect(results[4]).toHaveTextContent('5');
  });

  test('should render five links even if there are more than 60 numbers of articles', () => {
    // arrange
    const totalArticles = 61;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={1}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
    expect(results[2]).toHaveTextContent('3');
    expect(results[3]).toHaveTextContent('4');
    expect(results[4]).toHaveTextContent('5');
  });
});

describe('renders pagination items having correct page numbers depending on the current page number', () => {
  test('should render links navigating to page 1 to 5 if the current page is the first page', () => {
    // arrange
    const currentPageNumber = 1;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
    expect(results[2]).toHaveTextContent('3');
    expect(results[3]).toHaveTextContent('4');
    expect(results[4]).toHaveTextContent('5');
  });

  test('should render links navigating to page 1 to 5 if the current page number is 2', () => {
    // arrange
    const currentPageNumber = 2;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
    expect(results[2]).toHaveTextContent('3');
    expect(results[3]).toHaveTextContent('4');
    expect(results[4]).toHaveTextContent('5');
  });

  test('should render links navigation to page 1 to 5 if the current page number is 3', () => {
    // arrange
    const currentPageNumber = 3;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('1');
    expect(results[1]).toHaveTextContent('2');
    expect(results[2]).toHaveTextContent('3');
    expect(results[3]).toHaveTextContent('4');
    expect(results[4]).toHaveTextContent('5');
  });

  test('should render links navigating to page 2 to 6 if the current page number is 4', () => {
    // arrange
    const currentPageNumber = 4;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('2');
    expect(results[1]).toHaveTextContent('3');
    expect(results[2]).toHaveTextContent('4');
    expect(results[3]).toHaveTextContent('5');
    expect(results[4]).toHaveTextContent('6');
  });

  test('should render links navigating to page 2 to 6 if the current page number is 5', () => {
    // arrange
    const currentPageNumber = 5;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('2');
    expect(results[1]).toHaveTextContent('3');
    expect(results[2]).toHaveTextContent('4');
    expect(results[3]).toHaveTextContent('5');
    expect(results[4]).toHaveTextContent('6');
  });

  test('should render links navigation to page 2 to 6 if the current page is the last page', () => {
    // arrange
    const currentPageNumber = 6;
    const totalArticles = 72;

    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={currentPageNumber}
        totalArticles={totalArticles}
      />,
    );
    const results = screen.getAllByRole('link', { name: /^\d+$/ });

    // assert
    expect(results).toHaveLength(5);
    expect(results[0]).toHaveTextContent('2');
    expect(results[1]).toHaveTextContent('3');
    expect(results[2]).toHaveTextContent('4');
    expect(results[3]).toHaveTextContent('5');
    expect(results[4]).toHaveTextContent('6');
  });
});

describe('disables links depending on current page number', () => {
  test('should disable two links navigating to the previous and the first page if the current page is the first page', () => {
    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={1}
        totalArticles={50}
      />,
    );

    // assert
    expect(screen.getByRole('link', { name: '←' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('link', { name: '→' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });

  test('should disable two links navigating to the next and the last page if current page is the last page', () => {
    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={5}
        totalArticles={50}
      />,
    );

    // assert
    expect(screen.getByRole('link', { name: '←' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '5' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('link', { name: '→' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  test('should disable the link navigating to the current page if the current page is in the middle of the pages', () => {
    // act
    render(
      <Pagination
        baseUrl={'/articles'}
        currentPageNumber={3}
        totalArticles={50}
      />,
    );

    // assert
    expect(screen.getByRole('link', { name: '←' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('link', { name: '4' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '5' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
    expect(screen.getByRole('link', { name: '→' })).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  });
});
