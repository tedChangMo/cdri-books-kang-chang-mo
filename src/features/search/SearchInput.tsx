'use client';

import { useState, useSyncExternalStore, useRef, useEffect } from 'react';
import { Input, Button, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SearchIcon from '@/assets/icons/SearchIcon.svg';
import { useSearchTextStore } from '@/store/useSearchTextStore';
import { useRouter } from 'next/navigation';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window?.addEventListener('storage', callback);
  window?.addEventListener('local-storage-update', callback);
  return () => {
    window?.removeEventListener('storage', callback);
    window?.removeEventListener('local-storage-update', callback);
  };
};

const getSnapshot = () => {
  if (typeof window === 'undefined') return '[]';
  const saved = localStorage?.getItem('search_history');
  return !!saved ? saved : '[]';
};

const getServerSnapshot = () => '[]';

const detailOptionList = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
];

const SearchInput = ({
  activeParam = 'text',
  paramValue = '',
}: {
  activeParam: 'text' | 'title' | 'person' | 'publisher';
  paramValue: string;
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(
    activeParam === 'text' ? paramValue : '',
  );
  const [isFocused, setIsFocused] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailValue, setDetailValue] = useState(
    activeParam !== 'text' ? paramValue : '',
  );
  const [filterType, setFilterType] = useState(
    activeParam !== 'text' ? activeParam : 'title',
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const historyRaw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const history: string[] = JSON.parse(historyRaw);

  const setSearchText = useSearchTextStore((state) => state.setSearchText);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef?.current &&
        !containerRef?.current?.contains(e.target as Node)
      ) {
        setIsFocused(false);
        setIsDetailOpen(false);
      }
    };
    document?.addEventListener('mousedown', handleOutsideClick);
    return () => document?.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const updateHistoryStore = (nextHistory: string[]) => {
    localStorage?.setItem('search_history', JSON.stringify(nextHistory));
    window?.dispatchEvent(new Event('local-storage-update'));
  };

  const handleSearch = (value: string) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed === '') return;

    const filtered = history?.filter((item) => item !== trimmed);
    const nextHistory = [trimmed, ...filtered];

    if (nextHistory?.length > 8) {
      nextHistory?.pop();
    }

    updateHistoryStore(nextHistory);
    setIsFocused(false);
    setIsDetailOpen(false);
    setSearchText(trimmed);
    router.push(`?text=${trimmed}`);
  };

  const handleDetailSearch = () => {
    setIsDetailOpen(false);
    router.push(`?${filterType}=${detailValue}`);
  };

  const handleDeleteHistory = (e: React.MouseEvent, targetItem: string) => {
    e.stopPropagation();
    updateHistoryStore(history.filter((item) => item !== targetItem));
  };

  return (
    <div className="w-full max-w-[560]" ref={containerRef}>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Input
            size="large"
            placeholder="검색어를 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) =>
              handleSearch((e.target as HTMLInputElement).value)
            }
            onFocus={() => {
              setIsFocused(true);
              setIsDetailOpen(false);
            }}
            prefix={
              <SearchIcon
                className="mr-[10]"
                onClick={(e: Event) => {
                  e.stopPropagation();
                  setIsFocused(!isFocused);
                }}
              />
            }
            className={`[&_input]::placeholder:font-bold! [&_input]::placeholder:text-sub-dark! w-full items-center border-none! bg-light-gray! text-base shadow-none! transition-none! outline-none! ${
              isFocused && history.length > 0
                ? 'rounded-t-3xl! rounded-b-none!'
                : 'rounded-full!'
            } placeholder:font-bold! hover:bg-[#E5E7EB] focus:bg-light-gray [&_.ant-input-prefix]:flex [&_.ant-input-prefix]:h-[30px]! [&_.ant-input-prefix]:items-center`}
            style={{
              height: '48px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              padding: '10px',
            }}
          />

          {/* 피그마 드롭다운 검색 기록 레이어 */}
          {isFocused && history.length > 0 && (
            <div className="absolute top-[46px] left-0 z-50 w-full overflow-hidden rounded-b-3xl bg-light-gray pb-4">
              <div className="flex flex-col">
                {history.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearch(item)}
                    className="flex cursor-pointer items-center justify-between py-2 pr-6 pl-[50] transition-colors duration-150 hover:bg-[#E5E7EB]"
                  >
                    <span className="text-base leading-none text-sub-dark">
                      {item}
                    </span>
                    <button
                      onClick={(e) => handleDeleteHistory(e, item)}
                      className="flex cursor-pointer items-center justify-center border-none bg-transparent p-1 hover:text-red-500"
                    >
                      <CloseOutlined className="text-base" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Button
            onClick={() => {
              setIsDetailOpen(!isDetailOpen);
              setIsFocused(false);
            }}
            style={{
              color: `var(--color-sub-dark)`,
              fontWeight: '500',
              lineHeight: '14px',
            }}
            className={`h-8 max-w-18 rounded-xl border border-gray-300 px-[10px]!`}
          >
            상세검색
          </Button>

          {isDetailOpen && (
            <div className="absolute top-12 right-0 z-50 w-[85vw] max-w-90 rounded-2xl bg-white px-6 py-9 shadow-[0_8px_30px_rgb(0,0,0,0.08)] lg:left-1/2 lg:-translate-x-1/2">
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-2 right-2 cursor-pointer border-none bg-transparent p-1 text-gray-400 hover:text-gray-600"
              >
                <CloseOutlined className="text-base" />
              </button>

              <div className="mb-4 flex h-9 items-center gap-4 border-b-2 border-b-transparent">
                <Select
                  value={filterType}
                  onChange={(value) => setFilterType(value)}
                  variant="borderless"
                  options={detailOptionList?.filter(
                    (option) => option.value !== filterType,
                  )}
                  labelRender={() =>
                    detailOptionList.find(
                      (option) => option.value === filterType,
                    )?.label
                  }
                  popupMatchSelectWidth={false}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  style={{
                    minWidth: '100px',
                    maxWidth: '100px',
                    height: '36px',
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: '100% !important',
                    paddingLeft: '4px',
                    borderRadius: '0',
                    borderBottom: '2px solid var(--color-b-gray)',
                  }}
                />

                <input
                  type="text"
                  placeholder="검색어 입력"
                  value={detailValue}
                  onChange={(e) => setDetailValue(e.target.value)}
                  className="h-9 max-h-9 w-full border-b-2 border-b-active bg-transparent text-base font-medium outline-none placeholder:text-sub-dark"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDetailSearch();
                  }}
                />
              </div>

              <Button
                type="primary"
                size="large"
                onClick={() => handleDetailSearch()}
                style={{
                  height: '36px',
                  background: `var(--color-status-active)`,
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '22px',
                  padding: 0,
                }}
                className="w-full rounded-xl border-none text-base font-bold text-white shadow-sm hover:bg-[#3466E0]!"
              >
                검색하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
