import { designTokens } from '../../design/tokens';
import { useState } from 'react';
import NewsDetailModal from '../modal/NewsDetailModal';

type FilterType = 'all' | 'realtime' | 'popular';
type CategoryType = 'all' | '기술' | '시장' | '산업' | '정책' | '기업';

const NewsPanel = () => {
  const [selectedNews, setSelectedNews] = useState<{
    title: string;
    time: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  } | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('realtime');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const newsItems = [
    {
      title: '삼성전자, 3나노 공정 기술 개발 성공',
      time: '10분 전',
      sentiment: 'positive' as const,
      category: '기술' as const,
      isPopular: true,
    },
    {
      title: '반도체 업황 회복 신호 포착',
      time: '25분 전',
      sentiment: 'positive' as const,
      category: '시장' as const,
      isPopular: false,
    },
    {
      title: 'AI 칩 수요 증가세 지속',
      time: '1시간 전',
      sentiment: 'positive' as const,
      category: '산업' as const,
      isPopular: true,
    },
    {
      title: '중국 반도체 규제 강화 우려',
      time: '2시간 전',
      sentiment: 'negative' as const,
      category: '정책' as const,
      isPopular: false,
    },
    {
      title: 'SK하이닉스, HBM3 생산량 확대',
      time: '3시간 전',
      sentiment: 'positive' as const,
      category: '기업' as const,
      isPopular: true,
    },
  ];

  const categories: CategoryType[] = ['all', '기술', '시장', '산업', '정책', '기업'];

  // 필터링 로직
  const filteredNews = newsItems.filter((news) => {
    // 타입 필터링
    if (filterType === 'popular' && !news.isPopular) return false;
    if (filterType === 'realtime' && news.time.includes('시간')) return false;
    // 'all'은 모든 뉴스 표시

    // 카테고리 필터링
    if (selectedCategory !== 'all' && news.category !== selectedCategory) return false;

    return true;
  });

  return (
    <>
      <div
        className="flex-1 flex flex-col rounded-lg border border-dark-800 p-4 min-h-0 h-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-dark-800)' }}
      >
        {/* 헤더 */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-dark-100">뉴스</h3>

            {/* 필터 드롭다운 (오른쪽 끝) */}
            <div className="flex gap-2 items-center">
              {/* 타입 필터 드롭다운 */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="appearance-none bg-dark-700 text-dark-100 text-xs px-3 py-1.5 pr-8 rounded-lg border border-dark-600 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                >
                  <option value="realtime">실시간</option>
                  <option value="popular">인기</option>
                  <option value="all">전체</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-3 h-3 text-dark-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* 카테고리 필터 드롭다운 */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                  className="appearance-none bg-dark-700 text-dark-100 text-xs px-3 py-1.5 pr-8 rounded-lg border border-dark-600 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? '전체' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-3 h-3 text-dark-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 뉴스 리스트 */}
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 min-h-0 overflow-x-hidden">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <div
                key={index}
                className="p-3 rounded-lg cursor-pointer hover:bg-dark-700/50 transition-all duration-200"
                onClick={() =>
                  setSelectedNews({
                    title: news.title,
                    time: news.time,
                    sentiment: news.sentiment,
                  })
                }
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs text-dark-500 bg-dark-700 px-1.5 py-0.5 rounded">
                      {news.category}
                    </span>
                    {news.isPopular && (
                      <span className="text-xs text-warning-400 bg-warning-400/20 px-1.5 py-0.5 rounded">
                        인기
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-dark-500 flex-shrink-0">{news.time}</span>
                </div>
                <p className="text-sm text-dark-100 leading-snug line-clamp-2">{news.title}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-dark-400 text-sm">
              필터 조건에 맞는 뉴스가 없습니다
            </div>
          )}
        </div>
      </div>

      {/* 뉴스 상세 모달 */}
      {selectedNews && (
        <NewsDetailModal
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          newsTitle={selectedNews.title}
          newsTime={selectedNews.time}
          sentiment={selectedNews.sentiment}
        />
      )}
    </>
  );
};

export default NewsPanel;
