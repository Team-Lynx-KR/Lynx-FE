import { designTokens } from '../../design/tokens';
import { useState } from 'react';

interface BuyOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockName: string;
  stockCode: string;
  currentPrice: number;
  changePercent: number;
  availableBalance: number;
}

const BuyOrderModal = ({
  isOpen,
  onClose,
  stockName,
  stockCode,
  currentPrice,
  changePercent,
  availableBalance,
}: BuyOrderModalProps) => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState<number>(0);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const calculateOrderAmount = () => {
    return quantity * currentPrice;
  };

  const calculateFee = () => {
    // 수수료 계산 (예: 0.015%)
    return Math.floor(calculateOrderAmount() * 0.00015);
  };

  const calculateTotal = () => {
    return calculateOrderAmount() + calculateFee();
  };

  const handleQuickQuantity = (qty: number | 'max') => {
    if (qty === 'max') {
      const maxQty = Math.floor(availableBalance / currentPrice);
      setQuantity(maxQty);
    } else {
      setQuantity(qty);
    }
  };

  const isPositive = changePercent >= 0;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        onClick={onClose}
      >
        {/* 모달 컨텐츠 */}
        <div
          className="relative w-full max-w-md max-h-[90vh] rounded-lg border border-dark-700 flex flex-col"
          style={{ backgroundColor: designTokens.colors.dark[800] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <h2 className="text-lg font-semibold text-dark-100">매수 주문</h2>
            <button
              onClick={onClose}
              className="p-2 text-dark-400 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 스크롤 가능한 컨텐츠 영역 (스크롤바 숨김) */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* 종목 정보 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-dark-100 mb-1">{stockName}</h3>
              <p className="text-sm text-dark-400 mb-3">{stockCode}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-dark-100">
                  {formatPrice(currentPrice)}원
                </span>
                <span
                  className={`text-sm font-semibold ${isPositive ? 'text-error-500' : 'text-info-500'}`}
                >
                  {isPositive ? '+' : ''}
                  {changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* 주문 유형 */}
            <div className="mb-6">
              <p className="text-sm text-dark-400 mb-3">주문 유형</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    orderType === 'market' ? 'text-white' : 'text-dark-300'
                  }`}
                  style={
                    orderType === 'market'
                      ? {
                          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
                        }
                      : {
                          backgroundColor: designTokens.colors.dark[700],
                        }
                  }
                >
                  시장가
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    orderType === 'limit' ? 'text-white' : 'text-dark-300'
                  }`}
                  style={
                    orderType === 'limit'
                      ? {
                          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
                        }
                      : {
                          backgroundColor: designTokens.colors.dark[700],
                        }
                  }
                >
                  지정가
                </button>
              </div>
            </div>

            {/* 주문 수량 */}
            <div className="mb-6">
              <p className="text-sm text-dark-400 mb-3">주문 수량</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-dark-700 text-dark-100 mb-3"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
                placeholder="0 주"
                min="0"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickQuantity(10)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: designTokens.colors.dark[700],
                    color: designTokens.colors.dark[300],
                  }}
                >
                  10주
                </button>
                <button
                  onClick={() => handleQuickQuantity(50)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: designTokens.colors.dark[700],
                    color: designTokens.colors.dark[300],
                  }}
                >
                  50주
                </button>
                <button
                  onClick={() => handleQuickQuantity(100)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: designTokens.colors.dark[700],
                    color: designTokens.colors.dark[300],
                  }}
                >
                  100주
                </button>
                <button
                  onClick={() => handleQuickQuantity('max')}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: designTokens.colors.dark[700],
                    color: designTokens.colors.dark[300],
                  }}
                >
                  최대
                </button>
              </div>
            </div>

            {/* 주문 정보 */}
            <div
              className="rounded-lg border border-dark-700 p-4 mb-6"
              style={{ backgroundColor: designTokens.colors.dark[700] }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-400">주문 금액</span>
                  <span className="text-sm font-semibold text-dark-100">
                    {formatPrice(calculateOrderAmount())}원
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-400">수수료(예상)</span>
                  <span className="text-sm font-semibold text-dark-100">
                    {formatPrice(calculateFee())}원
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dark-600">
                  <span className="text-base font-semibold text-dark-100">총 결제 금액</span>
                  <span className="text-base font-bold text-dark-100">
                    {formatPrice(calculateTotal())}원
                  </span>
                </div>
              </div>
            </div>

            {/* 매수 가능 */}
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-info-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-dark-400 mb-1">매수 가능</p>
                <p className="text-base font-semibold text-dark-100">
                  {formatPrice(availableBalance)}원
                </p>
              </div>
            </div>
          </div>

          {/* 하단 액션 버튼 */}
          <div className="flex gap-3 p-6 border-t border-dark-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{
                backgroundColor: designTokens.colors.dark[700],
                color: designTokens.colors.dark[100],
              }}
            >
              취소
            </button>
            <button
              className="flex-1 px-4 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg font-semibold transition-colors duration-200"
              disabled={quantity === 0 || calculateTotal() > availableBalance}
            >
              매수 주문
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyOrderModal;

