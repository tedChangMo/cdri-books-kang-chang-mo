import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BookType } from '@/shared/types';

type LikeBooksState = {
  likeBooks: BookType[];
  setLikeBooks: (books: BookType[]) => void;
};

export const useLikeBooksStore = create<LikeBooksState>()(
  persist(
    (set) => ({
      likeBooks: [],
      setLikeBooks: (value) => set({ likeBooks: value }),
    }),
    {
      name: 'like-books-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
