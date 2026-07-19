import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchState {
  searchTexts: string[];
  setSearchTexts: (value: string[]) => void;
}

export const useSearchTextStore = create<SearchState>()(
  persist(
    (set) => ({
      searchTexts: [],
      setSearchTexts: (value) => set({ searchTexts: value }),
    }),
    {
      name: 'search-text-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
