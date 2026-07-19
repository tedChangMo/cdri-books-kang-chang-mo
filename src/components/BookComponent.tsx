'use client';

import { useState } from 'react';
import Image from 'next/image';
import LikeIcon from '@/assets/icons/LikeIcon.svg';
import UnlikeIcon from '@/assets/icons/UnlikeIcon.svg';
import CustomDownOutlinedIcon from '@/assets/icons/CustomDownOutlinedIcon.svg';
import { CreditCardOutlined } from '@ant-design/icons';
import { Font } from './Font';
import { Button, Skeleton } from 'antd';
import { formatWon } from '@/shared/utils/formatter';
import { useLikeBooksStore } from '@/store/useLikeBooksStore';
import { BookType } from '@/shared/types';

const BookComponent = ({ book }: { book: BookType }) => {
  const [detailView, setDetailView] = useState(false);
  const { likeBooks, setLikeBooks } = useLikeBooksStore();

  const saleExist = book?.sale_price && book.sale_price > 0;
  const isLiked = likeBooks?.some((liked) => liked.isbn === book.isbn);

  return (
    <div
      className={`flex w-full min-w-0 justify-between p-0 md:p-4 ${
        detailView
          ? 'h-auto flex-col items-stretch gap-6 pt-6 pb-10 pl-0 lg:flex-row lg:items-start lg:gap-8 lg:pl-[54px]'
          : 'max-h-[344px] min-h-[100px] flex-row pl-0 lg:items-center lg:pl-12'
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          detailView
            ? 'mx-auto h-[280px] w-[210px] lg:mx-0'
            : 'mr-3 hidden h-[68px] w-[48px] sm:block lg:mr-12'
        }`}
      >
        <div
          className={`absolute z-10 ${detailView ? 'top-3 right-[10px]' : 'top-[2px] right-[2px]'}`}
        >
          {isLiked ? (
            <LikeIcon
              className={`${detailView ? 'h-[18px] w-5' : 'h-3 w-[14px]'} cursor-pointer`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setLikeBooks(
                  likeBooks?.filter((liked) => liked.isbn !== book.isbn),
                );
              }}
            />
          ) : (
            <UnlikeIcon
              className={`${detailView ? 'h-[18px] w-5' : 'h-3 w-[14px]'} cursor-pointer`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setLikeBooks([...likeBooks, book]);
              }}
            />
          )}
        </div>
        {!!book?.thumbnail ? (
          <Image
            alt={book.title}
            src={book.thumbnail}
            sizes={detailView ? '210px' : '48px'}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="h-full w-full">
            <Skeleton.Node
              className="!h-full !w-full"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}
      </div>

      {detailView ? (
        <div className="flex min-w-0 flex-1 flex-col items-stretch justify-between gap-6 lg:h-[280px] lg:flex-row lg:gap-0">
          <div className="flex min-w-0 flex-1 flex-col lg:max-h-[280px] lg:pr-12">
            <div className="mt-3 mb-4 flex flex-wrap items-center gap-2 lg:mt-5 lg:gap-4">
              <Font
                size="lg"
                weight="bold"
                className="leading-tight break-all whitespace-normal"
              >
                {book.title}
              </Font>
              <Font
                size="sm"
                color="text-sub-dark!"
                className="min-w-fit shrink-0"
              >
                {book.authors.length > 1
                  ? `${book.authors} 외`
                  : book.authors.length === 1
                    ? book.authors
                    : '작자 미상'}
              </Font>
            </div>

            <div className="flex flex-col gap-3">
              <Font
                size="sm"
                weight="bold"
                className="leading-[26px]! text-black"
              >
                책 소개
              </Font>
              <Font className="line-clamp-11 text-[10px]! leading-4! whitespace-pre-wrap">
                {book.contents || ''}
              </Font>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col items-end justify-between gap-4 lg:w-60 lg:gap-0">
            <Button
              type="primary"
              size="large"
              style={{
                height: '40px',
                color: `var(--color-gray-custom)`,
                background: `var(--color-light-gray)`,
                padding: '0 16px',
                boxShadow: 'none',
              }}
              className="flex items-center justify-center gap-1 rounded-xl border-none text-sm font-bold hover:bg-slate-200!"
              onClick={() => setDetailView(false)}
            >
              상세보기
              <CustomDownOutlinedIcon className="h-2 w-4 rotate-180 transform" />
            </Button>

            <div className="flex w-full flex-col items-end">
              <div className="mb-4 flex flex-col items-end gap-2 sm:mb-7">
                <div className="flex items-center gap-2">
                  <Font
                    color="text-sub-dark"
                    className="w-12 self-end! text-right! text-[10px]! leading-[22px]!"
                  >
                    원가
                  </Font>
                  <Font
                    size="base"
                    className={`font-! w-[76px] text-left! leading-[26px]! ${saleExist ? 'line-through' : ''}`}
                  >
                    {`${formatWon(book?.price || 0)}원`}
                  </Font>
                </div>
                {saleExist && (
                  <div className="flex items-center gap-2">
                    <Font
                      color="text-sub-dark"
                      className="w-12 self-end! text-right! text-[10px]! leading-[22px]!"
                    >
                      할인가
                    </Font>
                    <Font
                      size="base"
                      weight="bold"
                      className="w-[76px] text-left! leading-[26px]!"
                    >
                      {`${formatWon(book.sale_price || 0)}원`}
                    </Font>
                  </div>
                )}
              </div>
              <Button
                type="primary"
                size="large"
                style={{
                  height: '48px',
                  background: `var(--color-status-active)`,
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '24px',
                  padding: 0,
                  boxShadow: 'none',
                }}
                className="w-full cursor-pointer rounded-xl border-none text-base font-bold text-white hover:bg-[#3466E0]!"
                onClick={() => {
                  window?.open(book?.url, '_blank');
                }}
              >
                구매하기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mr-4 flex min-w-0 flex-1 flex-col items-center justify-center gap-4 lg:flex-row lg:justify-start">
            <Font
              weight="bold"
              className="line-clamp-2! block min-w-0 overflow-hidden text-base leading-none text-ellipsis whitespace-normal lg:text-lg lg:whitespace-nowrap"
            >
              {book.title}
            </Font>
            <Font
              size="sm"
              color="text-sub-dark!"
              className="min-w-fit shrink-0 leading-none"
            >
              {book.authors.length > 1
                ? `${book.authors[0]} 외`
                : book.authors.length === 1
                  ? book.authors[0]
                  : '작자 미상'}
            </Font>
          </div>
          <div className="flex shrink-0 items-center justify-end">
            <div className="mr-2 flex w-[75px] shrink-0 items-center justify-end lg:mr-14 lg:w-[100px]">
              <Font size="lg" weight="bold" className="whitespace-nowrap">
                {formatWon(saleExist ? book?.sale_price : book.price || 0)}원
              </Font>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Button
                type="primary"
                size="large"
                style={{
                  height: '40px',
                  background: `var(--color-status-active)`,
                  boxShadow: 'none',
                }}
                className="flex w-10 items-center justify-center rounded-xl border-none font-bold text-white hover:bg-[#3466E0]! sm:w-[116px]"
                onClick={() => {
                  window?.open(book?.url, '_blank');
                }}
              >
                <span className="hidden text-base font-bold sm:inline">
                  구매하기
                </span>
                <span className="text-lg md:hidden">
                  <CreditCardOutlined />
                </span>
              </Button>

              <Button
                type="primary"
                size="large"
                style={{
                  height: '40px',
                  color: `var(--color-gray-custom)`,
                  background: `var(--color-light-gray)`,
                  boxShadow: 'none',
                }}
                className="flex w-10 items-center justify-center rounded-xl border-none p-0! font-bold hover:bg-slate-200! sm:w-[116px] sm:p-4!"
                onClick={() => setDetailView(true)}
              >
                <span className="mr-1 hidden text-base font-bold sm:inline">
                  상세보기
                </span>
                <CustomDownOutlinedIcon className="h-4 w-4 sm:h-2 sm:w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookComponent;
