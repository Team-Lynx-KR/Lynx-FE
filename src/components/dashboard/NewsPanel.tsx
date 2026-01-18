import { useState, useEffect } from 'react';
import NewsDetailModal from '../modal/NewsDetailModal';
import { fetchMultipleRSSFeeds, STOCK_RSS_FEEDS, RSSNewsItem } from '../../utils/rssParser';

type FilterType = 'all' | 'realtime' | 'popular';
type CategoryType = 'all' | '기술' | '시장' | '산업' | '정책' | '기업';

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

// 카테고리 추출 (뉴스 제목이나 설명에서 키워드 기반)
const extractCategory = (item: RSSNewsItem): CategoryType => {
  const title = item.title.toLowerCase();
  const description = (item.description || '').toLowerCase();

  const text = `${title} ${description}`;

  if (
    text.includes('기술') ||
    text.includes('공정') ||
    text.includes('개발') ||
    text.includes('칩')
  ) {
    return '기술';
  }
  if (
    text.includes('시장') ||
    text.includes('증시') ||
    text.includes('코스피') ||
    text.includes('코스닥')
  ) {
    return '시장';
  }
  if (text.includes('산업') || text.includes('업종') || text.includes('업계')) {
    return '산업';
  }
  if (text.includes('정책') || text.includes('규제') || text.includes('정부')) {
    return '정책';
  }
  if (
    text.includes('기업') ||
    text.includes('회사') ||
    text.includes('삼성') ||
    text.includes('sk') ||
    text.includes('lg')
  ) {
    return '기업';
  }

  return '시장'; // 기본값
};

// 감정 분석 (간단한 키워드 기반)
const analyzeSentiment = (item: RSSNewsItem): 'positive' | 'negative' | 'neutral' => {
  const title = item.title.toLowerCase();
  const description = (item.description || '').toLowerCase();
  const text = `${title} ${description}`;

  const positiveKeywords = ['상승', '증가', '성장', '회복', '확대', '성공', '상향', '호재', '긍정'];
  const negativeKeywords = ['하락', '감소', '우려', '규제', '부정', '하향', '악재', '위축', '경고'];

  const hasPositive = positiveKeywords.some((keyword) => text.includes(keyword));
  const hasNegative = negativeKeywords.some((keyword) => text.includes(keyword));

  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

interface NewsItem {
  id: string;
  title: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: CategoryType;
  isPopular: boolean;
  link?: string;
  description?: string;
}

const NewsPanel = () => {
  const [selectedNews, setSelectedNews] = useState<{
    title: string;
    time: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  } | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('realtime');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories: CategoryType[] = ['all', '기술', '시장', '산업', '정책', '기업'];

  // RSS 피드에서 뉴스 가져오기
  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const rssItems = await fetchMultipleRSSFeeds(STOCK_RSS_FEEDS);

        // RSS 데이터를 NewsItem 형식으로 변환
        const formattedNews: NewsItem[] = rssItems.slice(0, 50).map((item) => {
          const category = extractCategory(item);
          const sentiment = analyzeSentiment(item);

          return {
            id: item.id,
            title: item.title,
            time: formatTimeAgo(item.publishedAt),
            sentiment,
            category,
            isPopular: false, // RSS에서는 인기 여부를 판단하기 어려움
            link: item.link,
            description: item.description,
          };
        });

        // RSS 피드에서 데이터를 성공적으로 가져온 경우에만 업데이트
        if (formattedNews.length > 0) {
          setNewsItems(formattedNews);
        } else {
          // RSS 피드에서 데이터를 가져오지 못한 경우
          // (프록시 실패 등의 이유로) 빈 배열 유지
          console.warn(
            '[NewsPanel] RSS 피드에서 뉴스를 가져오지 못했습니다. 백엔드 API를 사용하는 것을 권장합니다.'
          );
        }
      } catch (error) {
        console.error('[NewsPanel] 뉴스 로드 실패:', error);
        // 에러 발생 시 기존 뉴스 유지 (빈 배열로 초기화하지 않음)
        // setNewsItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();

    // 5분마다 뉴스 업데이트
    const interval = setInterval(loadNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 필터링 로직
  const filteredNews = newsItems.filter((news) => {
    // 타입 필터링
    if (filterType === 'popular' && !news.isPopular) return false;
    if (filterType === 'realtime') {
      // '실시간' 필터: 1시간 이내 뉴스만 표시
      const timeMatch = news.time.match(/(\d+)(분|시간) 전/);
      if (timeMatch) {
        const value = parseInt(timeMatch[1]);
        const unit = timeMatch[2];
        if (unit === '시간' && value >= 1) return false;
      } else if (news.time.includes('일 전')) {
        return false;
      }
    }

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
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-dark-400 text-sm">
              뉴스를 불러오는 중...
            </div>
          ) : filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <div
                key={news.id}
                className="p-3 rounded-lg cursor-pointer hover:bg-dark-700/50 transition-all duration-200"
                onClick={() => {
                  setSelectedNews({
                    title: news.title,
                    time: news.time,
                    sentiment: news.sentiment,
                  });
                  // 링크가 있으면 새 탭에서 열기
                  if (news.link) {
                    window.open(news.link, '_blank');
                  }
                }}
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
    </>
  );
};

export default NewsPanel;
