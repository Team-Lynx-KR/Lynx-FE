/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { searchStock } from '../../api/stock';
import { useAppStore } from '../../store/useAppStore';

interface SearchResult {
  code: string;
  name: string;
  marketType?: string;
}

const Header = () => {
  const { setSearchedStock } = useAppStore();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 검색 API 호출 (debounce)
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchKeyword.trim()) {
      setSearchResults([]);
      setShowResults(false);
      // 검색어가 비어있으면 기본 대시보드로 복귀
      setSearchedStock(null);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await searchStock({ keyword: searchKeyword.trim() });

        if (response.stock) {
          // 단일 결과를 배열로 변환
          setSearchResults([
            {
              code: response.stock.code,
              name: response.stock.name,
              marketType: response.stock.marketType,
            },
          ]);
          setShowResults(true);
        } else if (response.stocks && Array.isArray(response.stocks)) {
          // 여러 결과가 있는 경우
          setSearchResults(
            response.stocks.map((s: any) => ({
              code: s.code,
              name: s.name,
              marketType: s.marketType,
            }))
          );
          setShowResults(true);
        } else {
          // 결과가 없는 경우
          setSearchResults([]);
          setShowResults(false);
        }
      } catch (error: any) {
        // 400 에러는 검색 결과가 없는 것으로 처리
        if (error.response?.status === 400) {
          console.log('[Header] 검색 결과 없음:', searchKeyword);
          setSearchResults([]);
          setShowResults(false);
          // 검색 결과가 없으면 기본 대시보드로 복귀
          setSearchedStock(null);
        } else {
          console.error('[Header] 종목 검색 실패:', error);
          setSearchResults([]);
          setShowResults(false);
          // 검색 실패 시에도 기본 대시보드로 복귀
          setSearchedStock(null);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchKeyword]);

  // 외부 클릭 시 검색 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('[Header] 종목 선택:', result);
    // 선택된 종목을 store에 저장 (대시보드에서 단일 종목만 표시)
    setSearchedStock({ code: result.code, name: result.name });
    setSearchKeyword(result.name);
    setShowResults(false);
  };

  return (
    <header
      className="border-dark-800 flex items-center justify-between px-6 py-4 mb-4"
      style={{ backgroundColor: 'var(--color-dark-800)' }}
    >
      <div className="flex items-center gap-6 flex-1">
        {/* 검색바 */}
        <div className="flex-1 max-w-md relative" ref={searchContainerRef}>
          <input
            type="text"
            placeholder="종목명을 입력해주세요! (예: 네이버)"
            value={searchKeyword}
            onChange={handleSearchChange}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            className="w-full px-4 py-2 border border-dark-700 rounded-md text-sm text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-dark-300 focus:border-transparent transition-all duration-200"
            style={{ backgroundColor: 'var(--color-dark-700)' }}
          />

          {/* 검색 결과 드롭다운 */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-dark-800 border border-dark-700 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.code}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-2 text-left hover:bg-dark-700 transition-colors text-sm text-dark-100 border-b border-dark-700 last:border-b-0"
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-xs text-dark-400">
                    {result.code} · {result.marketType || '주식'}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 검색 중 표시 */}
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-dark-800 border border-dark-700 rounded-md shadow-lg z-50 px-4 py-2 text-sm text-dark-400">
              검색 중...
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-dark-300 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
