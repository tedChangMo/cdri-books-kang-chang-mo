import { BookRequestType } from '@/shared/types';
import {
  useQuery,
  useInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query';
import { getBookSearch } from '../api';

export const useBookSearch = (params: BookRequestType) => {
  return useQuery(
    queryOptions({
      queryKey: [
        'books',
        'search',
        params?.query || '',
        params?.target || '',
        params?.page,
        params?.size,
      ] as const,

      queryFn: () => getBookSearch(params),

      staleTime: 1000 * 60 * 5,
      enabled: !!params?.query,
    }),
  );
};

export const useInfiniteBookSearch = (
  params: Omit<BookRequestType, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: [
      'books',
      'search',
      params?.query || '',
      params?.target || '',
      params?.size,
    ] as const,

    // 1페이지부터 시작하도록 기본값 설정
    initialPageParam: 1,

    // pageParam을 API 요청 파라미터의 page로 매핑
    queryFn: ({ pageParam }) => getBookSearch({ ...params, page: pageParam }),

    // meta.isEnd를 활용한 다음 페이지 계산 logic
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지라면 undefined를 반환하여 더 이상 fetch하지 않음
      if (lastPage?.meta?.is_end) {
        return undefined;
      }
      // 다음 페이지 번호 반환 (현재까지 누적된 페이지 수 + 1)
      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 5,
    enabled: !!params?.query,
  });
};
