'use client';

import React, { useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteBookSearch } from './service';
import { Spin } from 'antd';
import BookIcon from '@/assets/icons/BookIcon.svg';
import SearchInput from '@/features/search/SearchInput';
import BookComponent from '@/components/BookComponent';
import { BookType } from '@/shared/types';
import { Font } from '@/components/Font';

export const validParams = ['text', 'title', 'person', 'publisher'] as const;

const BookList = ({
  list = [],
  totalCount = 0,
  hasNextPage = false,
  fetchNextPage = () => {},
  isFetchingNextPage = false,
}: {
  list: BookType[];
  totalCount: number;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '40px',
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mt-6 flex flex-col justify-start gap-9">
      <div className="flex items-center gap-4">
        <Font size="lg" weight="medium" className="leading-8">
          도서 검색 결과
        </Font>
        <Font size="lg" weight="medium" className="leading-8">
          총 <span className="text-active">{totalCount}</span>건
        </Font>
      </div>

      {!!list && list.length > 0 ? (
        <div className="mb-4 flex flex-col">
          {list.map((book, index) => {
            return (
              <React.Fragment key={book.isbn}>
                <BookComponent key={book.isbn} book={book} />
                {index !== totalCount && (
                  <div className="h-px w-full bg-border-gray!" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-30">
          <div className="flex h-30 w-40 flex-col items-center justify-between">
            <BookIcon />
            <Font color="text-gray-custom">검색된 결과가 없습니다</Font>
          </div>
        </div>
      )}

      {hasNextPage && (
        <div
          ref={observerRef}
          className="flex h-5 w-full items-center justify-center"
        >
          {isFetchingNextPage && <Spin />}
        </div>
      )}
    </div>
  );
};

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const activeParam =
    validParams.find((key) => searchParams?.has(key)) || 'text';
  const paramValue = searchParams?.get(activeParam) || '';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // isLoading: infinitiLoading,
  } = useInfiniteBookSearch({
    query: paramValue,
    target:
      activeParam === 'text' || activeParam === 'title'
        ? 'title'
        : activeParam === 'publisher'
          ? 'publisher'
          : 'person',
    size: 10,
  });

  const infiniteBooks = data?.pages?.flatMap((page) => page.documents) ?? [];
  const infiniteCount = data?.pages[0]?.meta?.total_count;

  return (
    <div className="mx-4 mb-8 w-full max-w-[90%] pt-8 sm:mx-auto lg:max-w-240 lg:pt-[104]">
      <Font weight="bold" className="text-[22px]! leading-8!">
        도서 검색
      </Font>
      <SearchInput
        key={`${activeParam}${paramValue}`}
        activeParam={activeParam}
        paramValue={paramValue}
      />
      <BookList
        list={infiniteBooks || []}
        totalCount={infiniteCount || 0}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default SearchComponent;
