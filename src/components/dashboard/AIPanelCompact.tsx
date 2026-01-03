import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { designTokens } from '../../design/tokens';
import { useState } from 'react';
import AIRecommendationModal from '../modal/AIRecommendationModal';
import BuyOrderModal from '../modal/BuyOrderModal';

const AIPanelCompact = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyOrderModalOpen, setIsBuyOrderModalOpen] = useState(false);
  const [isSellOrderModalOpen, setIsSellOrderModalOpen] = useState(false);

  // 현재 가격과 예측 데이터
  const currentPrice = 71500;
  const predictedPrice = 73200; // 예측 가격

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: designTokens.colors.dark[800] },
        textColor: designTokens.colors.dark[400],
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
  }, []);

  return (
    <>
      <div
        className="rounded-lg border border-dark-800 p-4 h-full flex flex-col overflow-hidden"
        style={{ backgroundColor: designTokens.colors.dark[800] }}
        onClick={() => {
          setIsBuyOrderModalOpen(true);
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <h3 className="text-base font-semibold text-dark-100">AI 예측</h3>
          <div className="text-xs text-dark-400">삼성전자</div>
        </div>

        {/* 차트 영역 */}
        <div
          ref={chartContainerRef}
          className="flex-1 w-full min-h-0 mb-2"
          style={{
            position: 'relative',
            backgroundColor: designTokens.colors.dark[800],
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
              <div className="text-purple-400 font-medium">{predictedPrice.toLocaleString()}</div>
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
      </div>

      {/* AI 매매 추천 모달 */}
      <AIRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stockName="삼성전자"
        stockCode="005930"
      />

      {/* 매수 주문 모달 */}
      <BuyOrderModal
        isOpen={isBuyOrderModalOpen}
        onClose={() => setIsBuyOrderModalOpen(false)}
        stockName="삼성전자"
        stockCode="005930"
        currentPrice={71500}
        changePercent={2.34}
        availableBalance={1250000}
        orderType="buy"
      />

      {/* 매도 주문 모달 */}
      <BuyOrderModal
        isOpen={isSellOrderModalOpen}
        onClose={() => setIsSellOrderModalOpen(false)}
        stockName="삼성전자"
        stockCode="005930"
        currentPrice={71500}
        changePercent={2.34}
        availableBalance={1250000}
        orderType="sell"
      />
    </>
  );
};

export default AIPanelCompact;
