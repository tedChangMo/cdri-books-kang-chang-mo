import { BookRequestType, BookResponseType } from '@/shared/types';

const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO_REST_URL;

export const getBookSearch = async (
  params: BookRequestType,
): Promise<BookResponseType> => {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.append('query', params.query);
  if (params.target) searchParams.append('target', params.target);
  if (params.page) searchParams.append('page', String(params.page));
  if (params.size) searchParams.append('size', String(params.size));

  const response = await fetch(
    `${KAKAO_URL}/search/book?${searchParams.toString()}`,
  );
  return response?.json();
};
