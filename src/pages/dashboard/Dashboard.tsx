/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import StockChartCard from '../../components/chart/StockChartCard';
import IndicatorCard from '../../components/dashboard/ReportCard';
import AIPanelCompact from '../../components/dashboard/AIPanelCompact';
import NewsPanel from '../../components/dashboard/NewsPanel';
import BuyOrderModal from '../../components/modal/BuyOrderModal';
import WebSocketStatusPanel from '../../components/dashboard/WebSocketStatusPanel';
import WebSocketClient from '../../utils/websocket';
import { getKISWebSocketAuth, searchStock } from '../../api/stock';

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
}

const Dashboard = () => {
  // 대시보드에 표시할 종목 목록 (3x3 = 9개)
  const dashboardStocks = [
    { code: '005930', name: '삼성전자' },
    { code: '000660', name: 'SK하이닉스' },
    { code: '035420', name: 'NAVER' },
    { code: '373220', name: 'LG에너지솔루션' },
    { code: '035720', name: '카카오' },
    { code: '005380', name: '현대차' },
    { code: '006400', name: '삼성SDI' },
    { code: '028260', name: '삼성물산' },
    { code: '051910', name: 'LG화학' },
  ];

  const [stocks, setStocks] = useState<Record<string, StockData>>({});
  const [selectedStock, setSelectedStock] = useState<{
    name: string;
    code: string;
    price: number;
    changePercent: number;
    orderType: 'buy' | 'sell';
  } | null>(null);
  const wsClientRef = useRef<WebSocketClient | null>(null);
  const isConnectingRef = useRef<boolean>(false);
  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null);

  // WebSocket URL 환경 변수에서 가져오기
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

  // 초기 종목 데이터 로드 (REST API 사용)
  useEffect(() => {
    const loadInitialStockData = async () => {
      try {
        // 각 종목에 대해 종목명으로 검색하여 기본 정보 가져오기
        const stockPromises = dashboardStocks.map(async (stockInfo) => {
          try {
            // API는 종목명으로 검색해야 함
            const response = await searchStock({ keyword: stockInfo.name });
            
            // 응답 구조: { message: string, stock: {...}, prices: [...] }
            if (!response || !response.stock) {
              console.warn(`[Dashboard] ⚠️ ${stockInfo.name} 검색 응답 형식 오류:`, response);
              // 응답 형식이 맞지 않아도 종목은 표시
              return {
                code: stockInfo.code,
                name: stockInfo.name,
                price: 0,
                change: 0,
                changePercent: 0,
              };
            }

            const stockData = response.stock;
            // prices 배열의 첫 번째 요소(최신 일봉)에서 가격 정보 가져오기
            const latestPrice = response.prices && response.prices.length > 0 
              ? response.prices[0] 
              : null;
            const previousPrice = response.prices && response.prices.length > 1
              ? response.prices[1]
              : null;

            // 이전 가격과 비교하여 등락률 계산
            let price = 0;
            let change = 0;
            let changePercent = 0;

            if (latestPrice) {
              price = latestPrice.close || 0;
              const prevClose = previousPrice?.close || price;
              change = price - prevClose;
              changePercent = prevClose !== 0 ? ((change / prevClose) * 100) : 0;
            }

            // 종목 정보 반환
            return {
              code: stockData.code || stockInfo.code,
              name: stockData.name || stockInfo.name,
              price: price,
              change: change,
              changePercent: changePercent,
              volume: latestPrice?.volume || 0,
            };
            // 검색 결과가 없어도 종목은 표시 (기본값 사용)
            return {
              code: stockInfo.code,
              name: stockInfo.name,
              price: 0,
              change: 0,
              changePercent: 0,
            };
          } catch (error) {
            console.error(`[Dashboard] ❌ ${stockInfo.name} 검색 실패:`, error);
            // 검색 실패해도 종목은 표시
            return {
              code: stockInfo.code,
              name: stockInfo.name,
              price: 0,
              change: 0,
              changePercent: 0,
            };
          }
        });

        const results = await Promise.all(stockPromises);
        const stocksMap: Record<string, StockData> = {};

        results.forEach((stock) => {
          if (stock) {
            stocksMap[stock.code] = stock;
          }
        });

        setStocks(stocksMap);
        console.log('[Dashboard] ✅ 초기 종목 데이터 로드 완료:', stocksMap);
      } catch (error) {
        console.error('[Dashboard] ❌ 초기 종목 데이터 로드 실패:', error);
      }
    };

    loadInitialStockData();
  }, []); // 초기 마운트 시 한 번만 실행

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

        // state 업데이트로 WebSocketStatusPanel에 전달
        setWsClient(client);

        console.log('[Dashboard] ✅ WebSocket 연결 성공 - 대시보드 데이터 수신 준비 완료');

        // ⚠️ KIS WebSocket 구독 메시지 형식 문제로 인해 일시적으로 비활성화
        // 현재 메시지 형식이 서버 프로토콜과 맞지 않아 연결이 끊어짐 (code 1006)
        // 해결 방안:
        // 1. 백엔드에서 종목 데이터를 REST API로 제공받기
        // 2. 백엔드에서 KIS WebSocket을 프록시하여 올바른 형식으로 변환
        // 3. KIS WebSocket API 문서 확인 후 정확한 메시지 형식 적용

        console.log('[Dashboard] ⚠️ WebSocket 연결 완료 (PINGPONG만 수신 중)');
        console.log('[Dashboard] ℹ️ 구독 메시지는 메시지 형식 문제로 일시적으로 비활성화됨');
        console.log('[Dashboard] ℹ️ 백엔드 REST API를 통해 종목 데이터를 가져오는 것을 권장합니다');

        // WebSocket 메시지 핸들러 등록 (실시간 데이터 처리)
        client.onRawMessage((data) => {
          // PINGPONG 메시지는 무시
          if (data.header?.tr_id === 'PINGPONG') {
            return;
          }

          // 주식 데이터 처리 (KIS WebSocket 형식에 맞게 파싱)
          // TODO: 실제 WebSocket 메시지 구조에 맞게 수정 필요
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

        // 연결 성공 시 플래그는 유지 (cleanup에서만 해제)
      } catch (error) {
        if (mounted) {
          console.error('[Dashboard] ❌ WebSocket 연결 실패:', error);
        }
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
      // (Strict Mode cleanup에서도 연결 중이면 계속 유지)
      if (!wsClientRef.current?.isConnected()) {
        globalConnectingFlag = false;
        isConnectingRef.current = false;
      }

      if (wsClientRef.current) {
        wsClientRef.current.disconnect();
        wsClientRef.current = null;
        setWsClient(null); // state도 초기화
        console.log('[Dashboard] WebSocket 연결 해제');
      }
    };
  }, [wsUrl]);

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
        change={stock?.change || 0}
        changePercent={stock?.changePercent || 0}
        isUp={(stock?.changePercent || 0) >= 0}
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
        {/* 3x3 = 9개 종목 차트 */}
        {dashboardStocks.map((stock) => renderStockCard(stock))}
      </div>

      {/* 우측: 세로로 3개 배치 (AI 예측, 보조 지표, 뉴스) */}
      <div className="w-80 flex flex-col gap-4 h-full overflow-hidden">
        {/* AI 예측 */}
        <div className="flex-shrink-0" style={{ height: 'calc(33.333% - 8px)' }}>
          <AIPanelCompact />
        </div>

        {/* 보조 지표 */}
        <div className="flex-shrink-0" style={{ height: 'calc(33.333% - 8px)' }}>
          <IndicatorCard stockName={dashboardStocks[0].name} />
        </div>

        {/* 뉴스 */}
        <div className="flex-shrink-0 flex-1 min-h-0" style={{ height: 'calc(33.333% - 8px)' }}>
          <NewsPanel />
        </div>
      </div>

      {/* WebSocket 상태 패널 (우측 상단) */}
      <div className="absolute top-4 right-4 z-10">
        <WebSocketStatusPanel wsClient={wsClient} />
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
