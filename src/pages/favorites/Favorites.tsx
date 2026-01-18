import { useState, useEffect } from 'react';
import StockChartCard from '../../components/chart/StockChartCard';
import BuyOrderModal from '../../components/modal/BuyOrderModal';

const Favorites = () => {
  const [favoriteStocks, setFavoriteStocks] = useState<Array<{
    name: string;
    code: string;
    price: number;
    changePercent: number;
  }>>([]);
  const [selectedStock, setSelectedStock] = useState<{
    name: string;
    code: string;
    price: number;
    changePercent: number;
    orderType: 'buy' | 'sell';
  } | null>(null);

  // 관심 종목 로드
  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
      setFavoriteStocks(favorites);
    };

    loadFavorites();

    // 관심 종목 변경 이벤트 리스너
    const handleFavoriteChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoriteStocksChanged', handleFavoriteChange);
    return () => {
      window.removeEventListener('favoriteStocksChanged', handleFavoriteChange);
    };
  }, []);

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden">
      {favoriteStocks.length > 0 ? (
        <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 min-w-0">
          {favoriteStocks.map((stock) => (
            <StockChartCard
              key={stock.code}
              name={stock.name}
              code={stock.code}
              price={stock.price}
              changePercent={stock.changePercent}
              isUp={stock.changePercent >= 0}
              onClick={(orderType) =>
                setSelectedStock({
                  name: stock.name,
                  code: stock.code,
                  price: stock.price,
                  changePercent: stock.changePercent,
                  orderType,
                })
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-dark-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <p className="text-lg text-dark-400 mb-2">관심 종목이 없습니다</p>
            <p className="text-sm text-dark-500">대시보드에서 종목의 별 아이콘을 클릭하여 관심 종목에 추가하세요</p>
          </div>
        </div>
      )}

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

export default Favorites;

