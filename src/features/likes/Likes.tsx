'use client';

import React from 'react';
import { useLikeBooksStore } from '@/store/useLikeBooksStore';
import BookIcon from '@/assets/icons/BookIcon.svg';
import BookComponent from '@/components/BookComponent';
import { Font } from '@/components/Font';

const LikesComponent = () => {
  const { likeBooks } = useLikeBooksStore();

  return (
    <div className="mx-4 mb-8 w-full max-w-[90%] pt-8 sm:mx-auto lg:max-w-240 lg:pt-[104]">
      <Font weight="bold" className="text-[22px]! leading-8!">
        내가 찜한 책
      </Font>

      <div className="mt-6 flex flex-col justify-start gap-9">
        <div className="flex items-center gap-4">
          <Font size="lg" weight="medium" className="leading-8">
            찜한 책
          </Font>
          <Font size="lg" weight="medium" className="leading-8">
            총 <span className="text-active">{likeBooks?.length || 0}</span>건
          </Font>
        </div>

        {!!likeBooks && likeBooks.length > 0 ? (
          <div className="mb-4 flex flex-col">
            {likeBooks.map((book, index) => {
              return (
                <React.Fragment key={book.isbn}>
                  <BookComponent key={book.isbn} book={book} />
                  {index !== likeBooks?.length && (
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
              <Font color="text-gray-custom">찜한 책이 없습니다</Font>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesComponent;
