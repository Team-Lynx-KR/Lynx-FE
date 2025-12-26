import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { designTokens } from '../../design/tokens';

interface StockChartCardProps {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  isUp: boolean; // 상승(true) 또는 하락(false)
}

const StockChartCard = ({
  name,
  code,
  price,
  change,
  changePercent,
  isUp,
}: StockChartCardProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

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

    const lineSeries = chart.addLineSeries({
      color: isUp ? designTokens.colors.error : designTokens.colors.info,
      lineWidth: 2,
    });

    // 올바른 날짜 형식으로 샘플 데이터 생성
    const now = new Date();
    const sampleData = Array.from({ length: 50 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (49 - i));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return {
        time: `${year}-${month}-${day}`,
        value: price + (Math.random() - 0.5) * price * 0.1,
      };
    });

    lineSeries.setData(sampleData);
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
  }, [price, isUp]);

  const changeColor = isUp ? 'text-error-500' : 'text-info-500';
  const changeSign = isUp ? '+' : '';

  return (
    <div
      className="rounded-lg border border-dark-800 p-4 flex flex-col"
      style={{ backgroundColor: designTokens.colors.dark[800] }}
    >
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h4 className="text-base font-semibold text-dark-100">{name}</h4>
            <p className="text-xs text-dark-400">{code}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-dark-100">{price.toLocaleString()}원</p>
            <p className={`text-sm font-medium ${changeColor}`}>
              {changeSign}
              {changePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        className="flex-1 w-full min-h-0"
        style={{
          position: 'relative',
          backgroundColor: designTokens.colors.dark[800],
        }}
      />
    </div>
  );
};

export default StockChartCard;
