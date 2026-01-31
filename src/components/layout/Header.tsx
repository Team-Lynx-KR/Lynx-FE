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
  const { setSearchedStock, wsConnected, wsClient } = useAppStore();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showWsLogs, setShowWsLogs] = useState(false);
  const [wsLogs, setWsLogs] = useState<Array<{ timestamp: Date; data: any }>>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const wsLogPanelRef = useRef<HTMLDivElement>(null);

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
      if (wsLogPanelRef.current && !wsLogPanelRef.current.contains(event.target as Node)) {
        setShowWsLogs(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // WebSocket 로그 업데이트
  useEffect(() => {
    if (!wsClient || !showWsLogs) return;

    const updateLogs = () => {
      const logs = wsClient.getMessageLog();
      setWsLogs(logs);
    };

    // 초기 로그 로드
    updateLogs();

    // 주기적으로 로그 업데이트
    const interval = setInterval(updateLogs, 500);
    return () => clearInterval(interval);
  }, [wsClient, showWsLogs]);

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
      className="border-dark-800 flex items-center justify-between px-4 py-4"
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
        {/* WebSocket 연결 상태 표시 (점 또는 아이콘) - 클릭 시 로그 패널 표시 */}
        <div className="relative" ref={wsLogPanelRef}>
          <button
            onClick={() => setShowWsLogs(!showWsLogs)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title={
              wsConnected
                ? 'WebSocket 연결됨 (클릭하여 로그 보기)'
                : 'WebSocket 연결 끊김 (클릭하여 로그 보기)'
            }
          >
            {wsConnected ? (
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            )}
          </button>

          {/* WebSocket 로그 패널 */}
          {showWsLogs && (
            <div className="absolute top-full right-0 mt-2 w-96 h-96 bg-dark-800 rounded-lg border border-dark-700 shadow-xl z-50 flex flex-col overflow-hidden">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-3 border-b border-dark-700 bg-dark-700">
                <span className="text-sm font-medium text-dark-100">WebSocket 로그</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    wsClient?.clearLog();
                    setWsLogs([]);
                  }}
                  className="text-xs px-2 py-1 bg-dark-600 hover:bg-dark-500 text-dark-200 rounded transition-colors"
                >
                  지우기
                </button>
              </div>

              {/* 로그 영역 */}
              <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
                {wsLogs.length === 0 ? (
                  <div className="text-center text-dark-400 py-8">로그가 없습니다</div>
                ) : (
                  wsLogs.map((log, index) => (
                    <div
                      key={index}
                      className="mb-2 p-2 bg-dark-700 rounded border border-dark-600 hover:bg-dark-600 transition-colors"
                    >
                      <div className="text-dark-400 text-xs mb-1">
                        {log.timestamp.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                        .{log.timestamp.getMilliseconds().toString().padStart(3, '0')}
                      </div>
                      <pre className="text-dark-200 whitespace-pre-wrap break-words overflow-x-auto text-xs">
                        {typeof log.data === 'string'
                          ? log.data
                          : JSON.stringify(log.data, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 알림 아이콘 */}
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
