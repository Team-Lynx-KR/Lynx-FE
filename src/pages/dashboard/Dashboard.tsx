/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import StockChartCard from '../../components/chart/StockChartCard';
import IndicatorCard from '../../components/dashboard/ReportCard';
import AIPanelCompact from '../../components/dashboard/AIPanelCompact';
import NewsPanel from '../../components/dashboard/NewsPanel';
import BuyOrderModal from '../../components/modal/BuyOrderModal';
import WebSocketClient from '../../utils/websocket';
import { getKISWebSocketAuth, searchStock, getDashboardStocks } from '../../api/stock';
import { useAppStore } from '../../store/useAppStore';

// 전역 연결 플래그 (모든 Dashboard 인스턴스 공유)
let globalConnectingFlag = false;

interface StockData {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  foreignOwnership?: number;
  per?: number;
  dailyPrices?: Array<{
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: string;
  }>;
}

const Dashboard = () => {
  const { searchedStock, setWsConnected, setWsClient } = useAppStore();

  // API에서 받은 종목 목록
  const [dashboardStocksList, setDashboardStocksList] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [stocks, setStocks] = useState<Record<string, StockData>>({});
  const [selectedStock, setSelectedStock] = useState<{
    name: string;
    code: string;
    price: number;
    changePercent: number;
    orderType: 'buy' | 'sell';
  } | null>(null);

  // 로딩 상태 관리
  const [_isStockDataLoading, setIsStockDataLoading] = useState(true); // 추후 로딩 UI에 사용 예정
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null); // AI 분석 에러 메시지
  const [hasAIData, setHasAIData] = useState(false); // AI 분석 데이터 존재 여부

  // AI 분석 데이터 (추후 API 연동 시 사용)
  const [aiAnalysisKeyword, setAiAnalysisKeyword] = useState<string | null>(null); // 검색 키워드

  const wsClientRef = useRef<WebSocketClient | null>(null);
  const isConnectingRef = useRef<boolean>(false);
  const connectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // WebSocket URL 환경 변수에서 가져오기
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

  // 1. 주가 데이터 요청 (독립적으로 처리)
  useEffect(() => {
    const loadStockData = async () => {
      try {
        setIsStockDataLoading(true);

        // 검색으로 선택된 종목이 있으면 기존 로직 사용
        if (searchedStock) {
          try {
            const response = await searchStock({ keyword: searchedStock.name });

            if (response && response.stock) {
              const stockData = response.stock;
              const latestPrice =
                response.prices && response.prices.length > 0 ? response.prices[0] : null;
              const previousPrice =
                response.prices && response.prices.length > 1 ? response.prices[1] : null;

              let price = 0;
              let change = 0;
              let changePercent = 0;

              if (latestPrice) {
                price = latestPrice.close || 0;
                const prevClose = previousPrice?.close || price;
                change = price - prevClose;
                changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;
              }

              setStocks({
                [stockData.code || searchedStock.code]: {
                  code: stockData.code || searchedStock.code,
                  name: stockData.name || searchedStock.name,
                  price: price,
                  change: change,
                  changePercent: changePercent,
                  volume: latestPrice?.volume || 0,
                  dailyPrices: response.prices?.map((p) => ({
                    date: p.date,
                    open: p.open,
                    close: p.close,
                    high: p.high,
                    low: p.low,
                    volume: String(p.volume || 0),
                  })),
                },
              });
            }
          } catch (error) {
            console.error('[Dashboard] ❌ 검색 종목 데이터 로드 실패:', error);
          } finally {
            setIsStockDataLoading(false);
          }
          return;
        }

        // 기본 대시보드 종목 데이터 로드
        const response = await getDashboardStocks();
        console.log('[Dashboard] 📊 대시보드 API 호출 결과:', {
          message: response?.message,
          stocksCount: response?.stocks?.length || 0,
          stocks: response?.stocks?.map((s) => ({
            code: s.code,
            name: s.name,
            dailyPricesCount: s.dailyPrices?.length || 0,
          })),
        });

        if (!response || !response.stocks || response.stocks.length === 0) {
          console.warn('[Dashboard] ⚠️ 대시보드 종목 데이터가 없습니다.');
          return;
        }

        const stocksMap: Record<string, StockData> = {};
        // API 응답 순서를 그대로 유지하기 위해 먼저 종목 목록 생성 (필터링 후에도 순서 유지)
        const stocksList: Array<{ code: string; name: string }> = response.stocks
          .filter((stock) => stock.dailyPrices && stock.dailyPrices.length > 0)
          .map((stock) => ({
            code: stock.code,
            name: stock.name,
          }));

        // API 응답 순서대로 데이터 처리
        response.stocks.forEach((stock) => {
          if (!stock.dailyPrices || stock.dailyPrices.length === 0) {
            return;
          }

          // 최신 일봉 데이터 (첫 번째 요소)
          const latestPrice = stock.dailyPrices[0];
          // 이전 일봉 데이터 (두 번째 요소)
          const previousPrice = stock.dailyPrices[1] || latestPrice;

          const price = latestPrice.close || 0;
          const prevClose = previousPrice.close || price;
          const change = price - prevClose;
          const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;

          stocksMap[stock.code] = {
            code: stock.code,
            name: stock.name,
            price: price,
            change: change,
            changePercent: changePercent,
            volume: parseFloat(latestPrice.volume || '0'),
            dailyPrices: stock.dailyPrices.map((p) => ({
              date: p.date,
              open: p.open,
              close: p.close,
              high: p.high,
              low: p.low,
              volume: p.volume,
            })),
          };
        });

        setStocks(stocksMap);
        setDashboardStocksList(stocksList);

        console.log('[Dashboard] ✅ 주가 데이터 로드 완료');
      } catch (error) {
        console.error('[Dashboard] ❌ 주가 데이터 로드 실패:', error);
      } finally {
        setIsStockDataLoading(false);
      }
    };

    loadStockData();
  }, [searchedStock]); // searchedStock 변경 시 재로드

  // 3. AI 분석 요청 (검색 키워드 기반)
  const handleAIAnalysis = (keyword: string) => {
    setAiAnalysisKeyword(keyword);
  };

  useEffect(() => {
    const loadAIAnalysis = async () => {
      if (!aiAnalysisKeyword || aiAnalysisKeyword.trim() === '') {
        return;
      }

      try {
        setIsAILoading(true);
        setAiError(null);
        setHasAIData(false);

        console.log('[Dashboard] 🔮 AI 분석 요청 (추후 구현):', aiAnalysisKeyword);

        setTimeout(() => {
          setHasAIData(false);
          setAiError('AI 분석 기능은 아직 구현되지 않았습니다.');
          setIsAILoading(false);
          setAiAnalysisKeyword(null);
        }, 2000);
      } catch (error: any) {
        console.error('[Dashboard] ❌ AI 분석 로드 실패:', error);
        setHasAIData(false);
        setAiError(error?.message || 'AI 분석 데이터를 불러오는 중 오류가 발생했습니다.');
        setIsAILoading(false);
        setAiAnalysisKeyword(null);
      }
    };

    loadAIAnalysis();
  }, [aiAnalysisKeyword]);

  // Dashboard 마운트 시 WebSocket 자동 연결 (로그인 성공 후 자동 실행)
  useEffect(() => {
    if (!wsUrl) {
      console.warn('[Dashboard] WebSocket URL이 설정되지 않았습니다.');
      return;
    }

    // 이미 연결 중이거나 연결되어 있으면 중복 실행 방지
    if (globalConnectingFlag || isConnectingRef.current || wsClientRef.current?.isConnected()) {
      return;
    }

    // 즉시 플래그 설정 (중복 실행 방지)
    globalConnectingFlag = true;
    isConnectingRef.current = true;

    let mounted = true;

    const connectWebSocket = async () => {
      try {
        console.log('[Dashboard] 🔄 KIS WebSocket 접속키 발급 시작...');

        // KIS WebSocket 접속키 발급
        const authResponse = await getKISWebSocketAuth();
        const approvalKey = authResponse.approval_key;
        console.log('[Dashboard] ✅ 접속키 발급 성공');

        // 컴포넌트가 언마운트되었으면 연결하지 않음
        if (!mounted) {
          globalConnectingFlag = false;
          isConnectingRef.current = false;
          return;
        }

        // WebSocket 클라이언트 생성 및 연결
        const client = new WebSocketClient(wsUrl);
        wsClientRef.current = client;
        await client.connect(approvalKey);

        if (!mounted) {
          client.disconnect();
          globalConnectingFlag = false;
          isConnectingRef.current = false;
          return;
        }

        // 전역 상태에 연결 상태 및 클라이언트 인스턴스 저장 (Header에서 표시/로그용)
        setWsConnected(true);
        setWsClient(client);

        // WebSocket 연결 상태 주기적 확인 (Header 표시용)
        connectionIntervalRef.current = setInterval(() => {
          if (wsClientRef.current && mounted) {
            const isConnected = wsClientRef.current.isConnected();
            setWsConnected(isConnected);
          }
        }, 1000); // 1초마다 확인

        // WebSocket 메시지 핸들러 등록 (실시간 데이터 처리)
        client.onRawMessage((data) => {
          // 연결 상태 업데이트 (메시지 수신 시)
          if (wsClientRef.current) {
            setWsConnected(wsClientRef.current.isConnected());
          }

          // PINGPONG 메시지는 무시
          if (data.header?.tr_id === 'PINGPONG') {
            return;
          }

          // 주식 데이터 처리
          if (data.body && data.header?.tr_id) {
            try {
              const stockCode = data.body.iscd_stat_cls_code || data.body.stck_cd;
              if (stockCode) {
                const stockData: StockData = {
                  code: stockCode,
                  name: dashboardStocks.find((s) => s.code === stockCode)?.name || stockCode,
                  price: parseFloat(data.body.stck_prpr || data.body.stock_price || '0'),
                  change: parseFloat(data.body.prdy_vrss || data.body.change || '0'),
                  changePercent: parseFloat(
                    data.body.prdy_vrss_sign || data.body.change_percent || '0'
                  ),
                  volume: parseFloat(data.body.acml_vol || data.body.volume || '0'),
                };

                setStocks((prev) => ({
                  ...prev,
                  [stockCode]: stockData,
                }));

                console.log('[Dashboard] 📊 주식 데이터 업데이트:', stockCode, stockData);
              }
            } catch (error) {
              console.error('[Dashboard] ❌ 주식 데이터 파싱 실패:', error, data);
            }
          }
        });

        // interval은 useEffect의 cleanup에서 제거

        // 연결 성공 시 플래그는 유지 (cleanup에서만 해제)
      } catch (error) {
        if (mounted) {
          console.error('[Dashboard] ❌ WebSocket 연결 실패:', error);
        }
        // 에러 발생 시 연결 상태 업데이트
        setWsConnected(false);
        // 에러 발생 시에만 플래그 해제
        globalConnectingFlag = false;
        isConnectingRef.current = false;
      }
    };

    // 로그인 성공 후 자동으로 WebSocket 연결
    connectWebSocket();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      mounted = false;

      // 연결이 완료되지 않은 경우에만 플래그 해제
      if (!wsClientRef.current?.isConnected()) {
        globalConnectingFlag = false;
        isConnectingRef.current = false;
      }

      if (wsClientRef.current) {
        wsClientRef.current.disconnect();
        wsClientRef.current = null;
        setWsConnected(false); // 전역 상태도 초기화
        setWsClient(null); // 클라이언트 인스턴스도 초기화
        console.log('[Dashboard] WebSocket 연결 해제');
      }

      // 연결 상태 확인 interval 제거
      if (connectionIntervalRef.current) {
        clearInterval(connectionIntervalRef.current);
        connectionIntervalRef.current = null;
      }
    };
  }, [wsUrl]);

  // 검색으로 선택된 종목이 있으면 해당 종목만, 없으면 API에서 받은 종목 목록 사용
  const dashboardStocks = searchedStock
    ? [{ code: searchedStock.code, name: searchedStock.name }]
    : dashboardStocksList;

  // 대시보드 종목 카드 렌더링
  const renderStockCard = (stockInfo: { code: string; name: string }) => {
    const stock = stocks[stockInfo.code];
    const hasData = !!stock;

    return (
      <StockChartCard
        key={stockInfo.code}
        name={stockInfo.name}
        code={stockInfo.code}
        price={stock?.price || 0}
        changePercent={stock?.changePercent || 0}
        isUp={(stock?.changePercent || 0) >= 0}
        dailyPrices={stock?.dailyPrices}
        onClick={(orderType) => {
          if (hasData) {
            setSelectedStock({
              name: stockInfo.name,
              code: stockInfo.code,
              price: stock.price,
              changePercent: stock.changePercent,
              orderType,
            });
          }
        }}
      />
    );
  };

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden relative">
      {/* 중앙: 멀티 차트 대시보드 (3x3 그리드) */}
      <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 min-w-0">
        {/* 3x3 = 9개 종목 차트 - API 응답 순서대로 렌더링 */}
        {dashboardStocks.length > 0 ? (
          dashboardStocks.map((stock) => {
            // API 응답 순서대로 렌더링 (배열 순서 보장)
            return renderStockCard(stock);
          })
        ) : (
          // 로딩 중이거나 데이터가 없을 때
          <div className="col-span-3 row-span-3 flex items-center justify-center text-dark-400">
            종목 데이터를 불러오는 중...
          </div>
        )}
      </div>

      {/* 우측: 세로로 3개 배치 (AI 예측, 보조 지표, 뉴스) */}
      <div className="w-80 flex flex-col gap-4 h-full overflow-hidden">
        {/* AI 예측 */}
        <div className="flex-shrink-0" style={{ height: 'calc(45% - 10.67px)' }}>
          <AIPanelCompact
            stockName={dashboardStocks[0]?.name}
            stockCode={dashboardStocks[0]?.code}
            isLoading={isAILoading}
            hasData={hasAIData}
            error={aiError}
            onAnalyzeClick={handleAIAnalysis}
            autoLoad={false}
          />
        </div>

        {/* 보조 지표 */}
        <div className="flex-shrink-0" style={{ height: 'calc(20% - 5.33px)' }}>
          <IndicatorCard stockName={dashboardStocks[0]?.name || ''} />
        </div>

        {/* 뉴스 */}
        <div className="flex-shrink-0 flex-1 min-h-0" style={{ height: 'calc(35% - 9.33px)' }}>
          <NewsPanel stockName={dashboardStocks[0]?.name} />
        </div>
      </div>

      {/* 주문 모달 */}
      {selectedStock && (
        <BuyOrderModal
          isOpen={!!selectedStock}
          onClose={() => setSelectedStock(null)}
          stockName={selectedStock.name}
          stockCode={selectedStock.code}
          currentPrice={selectedStock.price}
          changePercent={selectedStock.changePercent}
          availableBalance={1250000}
          orderType={selectedStock.orderType}
        />
      )}
    </div>
  );
};

export default Dashboard;
