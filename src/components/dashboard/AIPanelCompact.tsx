import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { designTokens } from '../../design/tokens';
import AIRecommendationModal from '../modal/AIRecommendationModal';
import BuyOrderModal from '../modal/BuyOrderModal';

interface AIPanelCompactProps {
  stockName?: string;
  stockCode?: string;
  isLoading?: boolean;
  hasData?: boolean; // AI 분석 데이터 존재 여부
  error?: string | null; // 에러 메시지
  onAnalyzeClick?: (keyword: string) => void; // 검색 키워드 전달
  autoLoad?: boolean; // 자동 로드 옵션
}

const AIPanelCompact = ({
  stockName: initialStockName = '삼성전자',
  stockCode: initialStockCode = '005930',
  isLoading = false,
  hasData = false,
  error = null,
  onAnalyzeClick,
  autoLoad = false,
}: AIPanelCompactProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyOrderModalOpen, setIsBuyOrderModalOpen] = useState(false);
  const [isSellOrderModalOpen, setIsSellOrderModalOpen] = useState(false);
  const [themeChangeKey, setThemeChangeKey] = useState(0);
  const [_aiAnalysisData, _setAiAnalysisData] = useState<any>(null); // 추후 API 데이터 저장용

  // 검색한 종목 정보
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 기본값 공란
  const [currentStockName, setCurrentStockName] = useState<string>(initialStockName || '');
  const [currentStockCode, setCurrentStockCode] = useState<string>(initialStockCode || '');
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 시도 여부

  // 초기 종목명이 변경되면 currentStockName만 업데이트 (검색어는 공란 유지)
  useEffect(() => {
    if (initialStockName) {
      setCurrentStockName(initialStockName);
      setCurrentStockCode(initialStockCode || '');
    }
  }, [initialStockName, initialStockCode]);

  // 자동 로드 처리
  useEffect(() => {
    if (autoLoad && currentStockName && !isLoading && !hasData && onAnalyzeClick) {
      onAnalyzeClick(currentStockName);
    }
  }, [autoLoad, currentStockName, isLoading, hasData, onAnalyzeClick]);

  // 현재 가격과 예측 데이터 (추후 API에서 받아올 데이터)
  const currentPrice = 71500;
  const predictedPrice = 73200; // 예측 가격

  // 차트는 데이터가 있을 때만 렌더링
  useEffect(() => {
    if (!chartContainerRef.current || !hasData) {
      // 데이터가 없으면 차트 제거
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      return;
    }

    // CSS 변수에서 색상 가져오기
    const bgColor =
      getComputedStyle(document.documentElement).getPropertyValue('--color-dark-800').trim() ||
      '#1a1a1a';
    const textColor =
      getComputedStyle(document.documentElement).getPropertyValue('--color-dark-400').trim() ||
      '#a3a3a3';

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: bgColor },
        textColor: textColor,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        visible: false,
      },
      rightPriceScale: {
        visible: false,
      },
    });

    // 실제 가격 라인 (과거 데이터)
    const actualSeries = chart.addLineSeries({
      color: designTokens.colors.dark[400],
      lineWidth: 2,
      lineStyle: 0, // 실선
    });

    // 예측 가격 라인 (미래 데이터)
    const predictedSeries = chart.addLineSeries({
      color: designTokens.colors.purple?.[400] || '#a855f7',
      lineWidth: 2,
      lineStyle: 2, // 점선
    });

    // 과거 데이터 (실제 가격)
    const now = new Date();
    const actualData = Array.from({ length: 20 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (19 - i));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return {
        time: `${year}-${month}-${day}`,
        value: currentPrice + (Math.random() - 0.5) * currentPrice * 0.05,
      };
    });

    // 예측 데이터 (미래 5일)
    const predictedData = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() + (i + 1));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const trend = (predictedPrice - currentPrice) / 5;
      return {
        time: `${year}-${month}-${day}`,
        value: currentPrice + trend * (i + 1) + (Math.random() - 0.5) * currentPrice * 0.02,
      };
    });

    actualSeries.setData(actualData);
    predictedSeries.setData(predictedData);

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [themeChangeKey, hasData]);

  // 테마 변경 감지
  useEffect(() => {
    const handleThemeChange = () => {
      setThemeChangeKey((prev: number) => prev + 1);
    };

    window.addEventListener('themeChanged', handleThemeChange);
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return (
    <>
      <div
        className="rounded-lg border border-dark-800 p-4 h-full flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-dark-800)' }}
        onClick={() => {
          setIsBuyOrderModalOpen(true);
        }}
      >
        {/* 헤더 */}
        <div className="mb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-dark-100">AI 예측</h3>
          </div>

          {/* 검색 입력란 */}
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchKeyword.trim() && !isLoading) {
                  e.stopPropagation();
                  setCurrentStockName(searchKeyword.trim());
                  setCurrentStockCode(''); // 검색 시 코드는 비워둠 (API에서 받아올 예정)
                  setHasSearched(true); // 검색 시도 표시
                  onAnalyzeClick?.(searchKeyword.trim());
                }
              }}
              placeholder="종목명 또는 종목 코드를 입력하세요"
              className="w-full bg-dark-700 text-dark-100 text-sm px-3 py-2 pr-10 rounded-lg border border-dark-600 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-dark-500"
              onClick={(e) => e.stopPropagation()}
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

        {/* 로딩 중 */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center">
              <div className="text-sm text-dark-400 mb-1">AI 분석 중...</div>
              <div className="text-xs text-dark-500">잠시만 기다려주세요</div>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {!isLoading && error && (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center px-4">
              <div className="text-sm text-error-500 mb-1">⚠️ 분석 실패</div>
              <div className="text-xs text-dark-400">{error}</div>
            </div>
          </div>
        )}

        {/* 검색어 입력 안 함 (초기 상태) */}
        {!isLoading && !error && !hasData && !hasSearched && (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center px-4">
              <div className="text-sm text-dark-400 mb-1">AI 예측 데이터 없음</div>
              <div className="text-xs text-dark-500">종목을 검색하여 분석을 시작하세요</div>
            </div>
          </div>
        )}

        {/* 검색했지만 데이터 없음 */}
        {!isLoading && !error && !hasData && hasSearched && (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="text-center px-4">
              <div className="text-sm text-dark-400 mb-1">검색 결과가 없습니다</div>
              <div className="text-xs text-dark-500">
                '{currentStockName}' 종목의 AI 분석 데이터를 찾을 수 없습니다
              </div>
            </div>
          </div>
        )}

        {/* 데이터가 있을 때만 그래프와 정보 표시 */}
        {!isLoading && !error && hasData && (
          <>
            {/* 차트 영역 */}
            <div
              ref={chartContainerRef}
              className="flex-1 w-full min-h-0 mb-2"
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-dark-800)',
                minHeight: '120px',
              }}
            />

            {/* 범례 */}
            <div className="flex items-center gap-4 mb-2 flex-shrink-0 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-dark-400"></div>
                <span className="text-dark-400">실제</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 border-dashed border-purple-400 border-t-2"></div>
                <span className="text-purple-400">예측</span>
              </div>
            </div>

            {/* 지표 정보 */}
            <div className="flex-shrink-0 border-t border-dark-700 pt-2 mt-2">
              <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                <div>
                  <div className="text-dark-400 mb-0.5">현재가</div>
                  <div className="text-dark-100 font-medium">{currentPrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-dark-400 mb-0.5">예측가</div>
                  <div className="text-purple-400 font-medium">
                    {predictedPrice.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-dark-400 mb-0.5">예상수익</div>
                  <div className="text-error-500 font-medium">+2.4%</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-dark-400 mb-0.5">거래량</div>
                  <div className="text-dark-100 font-medium">12.5M</div>
                </div>
                <div>
                  <div className="text-dark-400 mb-0.5">외국인</div>
                  <div className="text-error-500 font-medium">+125K</div>
                </div>
                <div>
                  <div className="text-dark-400 mb-0.5">신뢰도</div>
                  <div className="text-warning-400 font-medium">78%</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI 매매 추천 모달 */}
      <AIRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stockName={currentStockName}
        stockCode={currentStockCode}
      />

      {/* 매수 주문 모달 */}
      <BuyOrderModal
        isOpen={isBuyOrderModalOpen}
        onClose={() => setIsBuyOrderModalOpen(false)}
        stockName={currentStockName}
        stockCode={currentStockCode}
        currentPrice={71500}
        changePercent={2.34}
        availableBalance={1250000}
        orderType="buy"
      />

      {/* 매도 주문 모달 */}
      <BuyOrderModal
        isOpen={isSellOrderModalOpen}
        onClose={() => setIsSellOrderModalOpen(false)}
        stockName={currentStockName}
        stockCode={currentStockCode}
        currentPrice={71500}
        changePercent={2.34}
        availableBalance={1250000}
        orderType="sell"
      />
    </>
  );
};

export default AIPanelCompact;
