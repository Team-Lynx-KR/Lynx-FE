import { useState } from 'react';
import StockChartCard from '../../components/chart/StockChartCard';
import IndicatorCard from '../../components/dashboard/ReportCard';
import AIPanelCompact from '../../components/dashboard/AIPanelCompact';
import NewsPanel from '../../components/dashboard/NewsPanel';
import BuyOrderModal from '../../components/modal/BuyOrderModal';

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState<{
    name: string;
    code: string;
    price: number;
    changePercent: number;
    orderType: 'buy' | 'sell';
  } | null>(null);

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden">
      {/* 중앙: 멀티 차트 대시보드 (3x3 그리드) */}
      <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 min-w-0">
        {/* 1행: 그래프 2개, 보조지표 분석 1개 */}
        <StockChartCard
          name="삼성전자"
          code="005930"
          price={71500}
          change={1635}
          changePercent={2.34}
          isUp={true}
          onClick={(orderType) =>
            setSelectedStock({
              name: '삼성전자',
              code: '005930',
              price: 71500,
              changePercent: 2.34,
              orderType,
            })
          }
        />
        <StockChartCard
          name="SK하이닉스"
          code="000660"
          price={128000}
          change={-1574}
          changePercent={-1.23}
          isUp={false}
          onClick={(orderType) =>
            setSelectedStock({
              name: 'SK하이닉스',
              code: '000660',
              price: 128000,
              changePercent: -1.23,
              orderType,
            })
          }
        />
        <IndicatorCard stockName="삼성전자" />

        {/* 2행: 그래프 2개, 보조지표 분석 1개 */}
        <StockChartCard
          name="NAVER"
          code="035420"
          price={185500}
          change={6395}
          changePercent={3.45}
          isUp={true}
          onClick={(orderType) =>
            setSelectedStock({
              name: 'NAVER',
              code: '035420',
              price: 185500,
              changePercent: 3.45,
              orderType,
            })
          }
        />
        <StockChartCard
          name="LG에너지솔루션"
          code="373220"
          price={425000}
          change={8035}
          changePercent={1.89}
          isUp={true}
          onClick={(orderType) =>
            setSelectedStock({
              name: 'LG에너지솔루션',
              code: '373220',
              price: 425000,
              changePercent: 1.89,
              orderType,
            })
          }
        />
        <IndicatorCard stockName="NAVER" />

        {/* 3행: 그래프 2개, 보조지표 분석 1개 */}
        <StockChartCard
          name="카카오"
          code="035720"
          price={48500}
          change={-1200}
          changePercent={-2.41}
          isUp={false}
          onClick={(orderType) =>
            setSelectedStock({
              name: '카카오',
              code: '035720',
              price: 48500,
              changePercent: -2.41,
              orderType,
            })
          }
        />
        <StockChartCard
          name="현대차"
          code="005380"
          price={245000}
          change={5200}
          changePercent={2.17}
          isUp={true}
          onClick={(orderType) =>
            setSelectedStock({
              name: '현대차',
              code: '005380',
              price: 245000,
              changePercent: 2.17,
              orderType,
            })
          }
        />
        <IndicatorCard stockName="LG에너지솔루션" />
      </div>

      {/* 우측: AI (상단), 뉴스 (하단) */}
      <div className="w-80 flex flex-col gap-4 h-full overflow-hidden">
        <div className="flex-shrink-0" style={{ height: 'calc(50% - 8px)' }}>
          <AIPanelCompact />
        </div>
        <div className="flex-shrink-0 flex-1 min-h-0" style={{ height: 'calc(50% - 8px)' }}>
          <NewsPanel />
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
