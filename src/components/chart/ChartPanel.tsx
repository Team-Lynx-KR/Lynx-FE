import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { designTokens } from '../../design/tokens';

const ChartPanel = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 차트 초기화
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { color: designTokens.colors.dark[900] },
        textColor: designTokens.colors.dark[400],
      },
      grid: {
        vertLines: { color: designTokens.colors.dark[800] },
        horzLines: { color: designTokens.colors.dark[800] },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // 예시 데이터
    const lineSeries = chart.addLineSeries({
      color: designTokens.colors.primary[500],
      lineWidth: 2,
    });

    // 샘플 데이터
    const sampleData = [
      { time: '2024-01-01', value: 100 },
      { time: '2024-01-02', value: 105 },
      { time: '2024-01-03', value: 103 },
      { time: '2024-01-04', value: 108 },
      { time: '2024-01-05', value: 110 },
    ];

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

    // 리사이즈 핸들러
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
  }, []);

  return (
    <div className="h-full w-full bg-dark-900 rounded-lg border border-dark-700 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-dark-100">차트</h3>
      </div>
      <div 
        ref={chartContainerRef} 
        className="flex-1 w-full min-h-0"
        style={{
          position: 'relative',
        }}
      />
    </div>
  );
};

export default ChartPanel;

