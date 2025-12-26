import StockChartCard from '../../components/chart/StockChartCard';
import AIPanel from '../ai/AIPanel';

const Dashboard = () => {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      {/* 좌측: 멀티 차트 대시보드 (3x3 그리드) */}
      <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-4">
        <StockChartCard
          name="삼성전자"
          code="005930"
          price={71500}
          change={1635}
          changePercent={2.34}
          isUp={true}
        />
        <StockChartCard
          name="SK하이닉스"
          code="000660"
          price={128000}
          change={-1574}
          changePercent={-1.23}
          isUp={false}
        />
        <StockChartCard
          name="NAVER"
          code="035420"
          price={185500}
          change={6395}
          changePercent={3.45}
          isUp={true}
        />
        <StockChartCard
          name="LG에너지솔루션"
          code="373220"
          price={425000}
          change={8035}
          changePercent={1.89}
          isUp={true}
        />
        <StockChartCard
          name="카카오"
          code="035720"
          price={48500}
          change={-1200}
          changePercent={-2.41}
          isUp={false}
        />
        <StockChartCard
          name="현대차"
          code="005380"
          price={245000}
          change={5200}
          changePercent={2.17}
          isUp={true}
        />
        <StockChartCard
          name="셀트리온"
          code="068270"
          price={185000}
          change={3500}
          changePercent={1.93}
          isUp={true}
        />
        <StockChartCard
          name="포스코"
          code="005490"
          price={425000}
          change={-8500}
          changePercent={-1.96}
          isUp={false}
        />
        <StockChartCard
          name="기아"
          code="000270"
          price={112000}
          change={2100}
          changePercent={1.91}
          isUp={true}
        />
      </div>

      {/* 우측: AI 투자 비서 */}
      <div className="w-96">
        <AIPanel />
      </div>
    </div>
  );
};

export default Dashboard;
