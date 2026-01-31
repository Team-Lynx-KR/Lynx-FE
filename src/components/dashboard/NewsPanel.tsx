import { useState, useEffect } from 'react';
import { getStockNews } from '../../api/stock';

// 시간 표시 포맷팅 함수
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    return `${diffDays}일 전`;
  }
};

interface NewsItem {
  title: string;
  url: string;
  description?: string;
  publishedAt?: string;
  source?: string;
  time?: string;
}

interface NewsPanelProps {
  stockName?: string; // 대시보드에서 선택된 종목명 전달
}

const NewsPanel = ({ stockName: _stockName }: NewsPanelProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 기본값 공란
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 종목명이 변경되어도 검색어는 자동 업데이트하지 않음 (사용자가 직접 입력)

  // 뉴스 조회 함수
  const loadNews = async (keyword: string) => {
    if (!keyword || keyword.trim() === '') {
      setNewsItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getStockNews({ keyword: keyword.trim() });

      if (response && response.news) {
        const formattedNews: NewsItem[] = response.news.map((item) => ({
          title: item.title,
          url: item.url,
          description: item.description,
          publishedAt: item.publishedAt,
          source: item.source,
          time: item.publishedAt ? formatTimeAgo(item.publishedAt) : undefined,
        }));

        setNewsItems(formattedNews);
      } else {
        setNewsItems([]);
      }
    } catch (error) {
      console.error('[NewsPanel] 뉴스 로드 실패:', error);
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어가 변경되면 뉴스 조회
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKeyword.trim()) {
        loadNews(searchKeyword);
      } else {
        setNewsItems([]);
      }
    }, 500); // 디바운싱: 500ms 후 검색

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  return (
    <>
      <div
        className="flex-1 flex flex-col rounded-lg border border-dark-800 p-4 min-h-0 h-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-dark-800)' }}
      >
        {/* 헤더 */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-dark-100">뉴스</h3>
          </div>

          {/* 검색 입력란 */}
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="종목명 또는 종목 코드를 입력하세요"
              className="w-full bg-dark-700 text-dark-100 text-sm px-3 py-2 pr-10 rounded-lg border border-dark-600 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-dark-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-dark-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 뉴스 리스트 */}
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 min-h-0 overflow-x-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-dark-400 text-sm">
              뉴스를 불러오는 중...
            </div>
          ) : newsItems.length > 0 ? (
            newsItems.map((news, index) => (
              <div
                key={`${news.url}-${index}`}
                className="p-3 rounded-lg cursor-pointer hover:bg-dark-700/50 transition-all duration-200"
                onClick={() => {
                  // URL이 있으면 새 탭에서 열기
                  if (news.url) {
                    window.open(news.url, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {news.source && (
                      <span className="text-xs text-dark-500 bg-dark-700 px-1.5 py-0.5 rounded flex-shrink-0">
                        {news.source}
                      </span>
                    )}
                  </div>
                  {news.time && (
                    <span className="text-xs text-dark-500 flex-shrink-0">{news.time}</span>
                  )}
                </div>
                <p className="text-sm text-dark-100 leading-snug line-clamp-2 mb-1">{news.title}</p>
                {news.description && (
                  <p className="text-xs text-dark-400 line-clamp-1">{news.description}</p>
                )}
              </div>
            ))
          ) : searchKeyword.trim() ? (
            <div className="flex items-center justify-center h-full text-dark-400 text-sm">
              검색 결과가 없습니다
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-dark-400 text-sm">
              종목명 또는 종목 코드를 입력해주세요
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPanel;
