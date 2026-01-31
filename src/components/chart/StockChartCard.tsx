/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

interface StockChartCardProps {
  name: string;
  code: string;
  price: number;
  changePercent: number;
  isUp: boolean; // 상승(true) 또는 하락(false)
  dailyPrices?: Array<{
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: string;
  }>;
  onClick?: (orderType: 'buy' | 'sell') => void;
}

const StockChartCard = ({
  name,
  code,
  price,
  changePercent,
  isUp,
  dailyPrices,
  onClick,
}: StockChartCardProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // 관심 종목 상태 관리 (localStorage에서 초기값 가져오기)
  const getInitialFavoriteState = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
    return favorites.some((stock: { code: string }) => stock.code === code);
  };

  const [isFavorite, setIsFavorite] = useState(getInitialFavoriteState);
  const [clickCount, setClickCount] = useState(0);
  const [themeChangeKey, setThemeChangeKey] = useState(0);

  useEffect(() => {
    if (!chartContainerRef.current) return;

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
        vertLines: { visible: true, color: 'rgba(163, 163, 163, 0.1)' },
        horzLines: { visible: true, color: 'rgba(163, 163, 163, 0.1)' },
      },
      timeScale: {
        visible: true,
        timeVisible: true,
        borderColor: 'rgba(163, 163, 163, 0.2)',
        tickMarkFormatter: (time: any, _tickMarkType: any, _locale: string) => {
          // time이 문자열인 경우 (YYYY-MM-DD 형식)
          if (typeof time === 'string') {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // "2026년 1월 16일 00:00" 형식
            return `${year}년 ${month}월 ${day}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          }

          // time이 숫자인 경우 (타임스탬프)
          if (typeof time === 'number') {
            const date = new Date(time * 1000); // 초 단위 타임스탬프를 밀리초로 변환
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return `${year}년 ${month}월 ${day}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          }

          // 기본값
          return String(time);
        },
      },
      rightPriceScale: {
        visible: false, // 오른쪽 Y축 비활성화
      },
      leftPriceScale: {
        visible: true, // 왼쪽 Y축 활성화
        borderColor: 'rgba(163, 163, 163, 0.2)',
        textColor: textColor,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      crosshair: {
        mode: 1, // Normal mode (크로스헤어 표시)
        vertLine: {
          visible: true,
          color: 'rgba(163, 163, 163, 0.5)',
          width: 1,
          style: 0, // Solid line
        },
        horzLine: {
          visible: true,
          color: 'rgba(163, 163, 163, 0.5)',
          width: 1,
          style: 0, // Solid line
        },
      },
    });

    // 캔들스틱 차트 시리즈 추가 (상승=파랑, 하락=빨강)
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4A90E2', // 파랑 (상승)
      downColor: '#E74C3C', // 빨강 (하락)
      borderUpColor: '#4A90E2',
      borderDownColor: '#E74C3C',
      wickUpColor: '#4A90E2',
      wickDownColor: '#E74C3C',
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1,
      },
      priceLineVisible: true, // 가격 라인 표시
    });

    // 실제 데이터가 있으면 사용, 없으면 샘플 데이터 생성
    let candlestickData;

    if (dailyPrices && dailyPrices.length > 0) {
      // API에서 받은 실제 데이터 사용
      candlestickData = dailyPrices
        .slice()
        .reverse() // 최신 데이터가 앞에 있으므로 역순으로 정렬
        .map((price) => ({
          time: price.date,
          open: price.open,
          high: price.high,
          low: price.low,
          close: price.close,
        }));
    } else {
      // 샘플 데이터 생성 (fallback)
      const now = new Date();
      candlestickData = Array.from({ length: 50 }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (49 - i));
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const basePrice = price * (0.9 + (i / 50) * 0.2);
        const variation = basePrice * 0.02;
        const open = basePrice + (Math.random() - 0.5) * variation;
        const close = open + (Math.random() - 0.5) * variation * 2;
        const high = Math.max(open, close) + Math.random() * variation;
        const low = Math.min(open, close) - Math.random() * variation;

        return {
          time: `${year}-${month}-${day}` as const,
          open: Math.round(open),
          high: Math.round(high),
          low: Math.round(low),
          close: Math.round(close),
        };
      });
    }

    candlestickSeries.setData(candlestickData);
    chartRef.current = chart;

    // TradingView 워터마크 제거 함수
    const removeWatermark = () => {
      if (chartContainerRef.current) {
        const watermarks = chartContainerRef.current.querySelectorAll('a[href*="tradingview.com"]');
        watermarks.forEach((watermark) => watermark.remove());
      }
    };

    // 초기 제거
    removeWatermark();

    // MutationObserver로 동적으로 추가되는 워터마크도 제거
    const observer = new MutationObserver(() => {
      removeWatermark();
    });

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current, {
        childList: true,
        subtree: true,
      });
    }

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
      observer.disconnect();
      chart.remove();
    };
  }, [price, isUp, themeChangeKey, dailyPrices]); // dailyPrices 의존성 추가

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

  const changeColor = isUp ? 'text-error-500' : 'text-info-500';
  const changeSign = isUp ? '+' : '';

  // 관심 종목 토글 함수
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // 홀수번 클릭 시 채워짐, 짝수번 클릭 시 비워짐
    const newIsFavorite = newClickCount % 2 === 1;
    setIsFavorite(newIsFavorite);

    // localStorage에 관심 종목 저장/제거
    const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
    const stockInfo = { name, code, price, changePercent };

    if (newIsFavorite) {
      // 추가
      if (!favorites.some((stock: { code: string }) => stock.code === code)) {
        favorites.push(stockInfo);
        localStorage.setItem('favoriteStocks', JSON.stringify(favorites));
        // 사이드바에 알림
        window.dispatchEvent(new CustomEvent('favoriteStocksChanged'));
      }
    } else {
      // 제거
      const updatedFavorites = favorites.filter((stock: { code: string }) => stock.code !== code);
      localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
      // 사이드바에 알림
      window.dispatchEvent(new CustomEvent('favoriteStocksChanged'));
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // 별 아이콘 클릭은 무시
    if ((e.target as HTMLElement).closest('[data-star-icon]')) {
      return;
    }
    // 차트 영역 클릭은 무시
    if ((e.target as HTMLElement).closest('[data-chart-container]')) {
      return;
    }
    // 클릭 시 매수 모달 열기
    if (onClick) {
      onClick('buy');
    }
  };

  return (
    <div
      className="rounded-lg border border-dark-800 p-4 flex flex-col cursor-pointer hover:opacity-90 transition-opacity duration-200 h-full"
      style={{ backgroundColor: 'var(--color-dark-800)' }}
      onClick={handleCardClick}
    >
      {/* 헤더: 별 아이콘, 종목명 (왼쪽) / 가격, 퍼센트 (오른쪽) */}
      <div className="mb-2 flex-shrink-0">
        <div className="flex items-start justify-between">
          {/* 왼쪽: 별 아이콘, 종목명 */}
          <div className="flex items-center gap-2">
            {/* 별 아이콘 */}
            <button
              data-star-icon
              onClick={handleStarClick}
              className="flex-shrink-0 hover:opacity-80 transition-opacity mt-0.5"
            >
              {isFavorite ? (
                <svg className="w-4 h-4 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ) : (
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              )}
            </button>
            {/* 종목명 */}
            <h4 className="text-base font-semibold text-dark-100">{name}</h4>
          </div>
          {/* 오른쪽: 가격, 퍼센트 */}
          <div className="text-right">
            <p className="text-lg font-bold text-dark-100">{price.toLocaleString()}원</p>
            <p className={`text-sm font-medium ${changeColor}`}>
              {changeSign}
              {changePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div
        ref={chartContainerRef}
        data-chart-container
        className="flex-1 w-full min-h-0 mb-2"
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-dark-800)',
          minHeight: '120px',
        }}
      />

      {/* 상세 정보 영역 */}
      <div className="flex-shrink-0 border-t border-dark-700 pt-2 mt-2">
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div>
            <div className="text-dark-400 mb-0.5">거래량</div>
            <div className="text-dark-100 font-medium">12.5M</div>
          </div>
          <div>
            <div className="text-dark-400 mb-0.5">시가총액</div>
            <div className="text-dark-100 font-medium">428조</div>
          </div>
          <div>
            <div className="text-dark-400 mb-0.5">외국인</div>
            <div className="text-error-500 font-medium">+125K</div>
          </div>
          <div>
            <div className="text-dark-400 mb-0.5">PER</div>
            <div className="text-dark-100 font-medium">12.5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChartCard;
