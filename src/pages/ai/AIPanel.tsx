import { designTokens } from '../../design/tokens';
import { useState } from 'react';
import AIRecommendationModal from '../../components/modal/AIRecommendationModal';
import IndicatorAnalysisModal from '../../components/modal/IndicatorAnalysisModal';
import NewsDetailModal from '../../components/modal/NewsDetailModal';
import BuyOrderModal from '../../components/modal/BuyOrderModal';

const AIPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [isBuyOrderModalOpen, setIsBuyOrderModalOpen] = useState(false);
  const [isSellOrderModalOpen, setIsSellOrderModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<{
    title: string;
    time: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  } | null>(null);

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        {/* AI 매매 추천 */}
        <div
          className="rounded-lg border border-dark-800 p-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: designTokens.colors.dark[800] }}
        >
          <div
            className="flex items-center justify-between mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-dark-100">AI 추천</h3>
            </div>
            {/* 별 아이콘 */}
            <svg className="w-4 h-4 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div
            className="flex items-center justify-between mb-2"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center">
              <span className="text-sm font-semibold rounded">삼성전자</span>
            </div>
            <div className="text-sm text-dark-300">
              <span className="text-dark-400">신뢰도 </span>
              <span className="font-semibold text-dark-100">78%</span>
            </div>
          </div>
          {/* 진행 바 */}
          <div
            className="w-full h-2 bg-dark-700 rounded-full mb-3 overflow-hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '78%',
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
              }}
            />
          </div>
          <p
            className="text-xs text-dark-400 leading-relaxed mb-3"
            onClick={() => setIsModalOpen(true)}
          >
            RSI 과매도 구간 진입, 거래량 급증, 긍정 뉴스 3건 감지
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsSellOrderModalOpen(true);
              }}
              className="flex-1 px-4 py-3 bg-info-600 hover:bg-info-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              매도
            </button>
            <button
              onClick={() => {
                setIsBuyOrderModalOpen(true);
              }}
              className="flex-1 px-4 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              매수
            </button>
          </div>
        </div>

        {/* 보조지표 분석 */}
        <div
          className="rounded-lg border border-dark-800 p-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: designTokens.colors.dark[800] }}
          onClick={() => setIsIndicatorModalOpen(true)}
        >
          <h3 className="text-base font-semibold text-dark-100 mb-4">보조지표 분석</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-sm text-dark-400 mb-1">RSI(14)</span>
              <span className="text-sm font-semibold text-dark-100">32.5</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-dark-400 mb-1">MACD</span>
              <span className="text-sm font-semibold text-dark-100">양전환</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-dark-400 mb-1">Volume</span>
              <span className="text-sm font-semibold text-dark-100">+145%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-dark-400 mb-1">Bollinger</span>
              <span className="text-sm font-semibold text-dark-100">하단접촉</span>
            </div>
          </div>
        </div>

        {/* 실시간 뉴스 */}
        <div
          className="flex-1 flex flex-col rounded-lg border border-dark-800 p-4 min-h-0"
          style={{ backgroundColor: designTokens.colors.dark[800] }}
        >
          <h3 className="text-base font-semibold text-dark-100 mb-4">실시간 뉴스</h3>
          <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 min-h-0">
            <div
              className="flex items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() =>
                setSelectedNews({
                  title: '삼성전자, 3나노 공정 기술 개발 성공',
                  time: '10분 전',
                  sentiment: 'positive',
                })
              }
            >
              <svg
                className="w-4 h-4 text-error-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-dark-100 mb-1">삼성전자, 3나노 공정 기술 개발 성공</p>
                <p className="text-xs text-dark-400">10분 전</p>
              </div>
            </div>
            <div
              className="flex items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() =>
                setSelectedNews({
                  title: '반도체 업황 회복 신호 포착',
                  time: '25분 전',
                  sentiment: 'positive',
                })
              }
            >
              <svg
                className="w-4 h-4 text-error-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-dark-100 mb-1">반도체 업황 회복 신호 포착</p>
                <p className="text-xs text-dark-400">25분 전</p>
              </div>
            </div>
            <div
              className="flex items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() =>
                setSelectedNews({
                  title: 'AI 칩 수요 증가세 지속',
                  time: '1시간 전',
                  sentiment: 'positive',
                })
              }
            >
              <svg
                className="w-4 h-4 text-error-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-dark-100 mb-1">AI 칩 수요 증가세 지속</p>
                <p className="text-xs text-dark-400">1시간 전</p>
              </div>
            </div>
            <div
              className="flex items-start gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() =>
                setSelectedNews({
                  title: '중국 반도체 규제 강화 우려',
                  time: '2시간 전',
                  sentiment: 'negative',
                })
              }
            >
              <svg
                className="w-4 h-4 text-info-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-dark-100 mb-1">중국 반도체 규제 강화 우려</p>
                <p className="text-xs text-dark-400">2시간 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI 매매 추천 모달 */}
      <AIRecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stockName=""
        stockCode="005930"
      />

      {/* 보조지표 상세 분석 모달 */}
      <IndicatorAnalysisModal
        isOpen={isIndicatorModalOpen}
        onClose={() => setIsIndicatorModalOpen(false)}
        stockName="삼성전자"
        stockCode="005930"
      />

      {/* 뉴스 상세 모달 */}
      {selectedNews && (
        <NewsDetailModal
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          newsTitle={selectedNews.title}
          newsTime={selectedNews.time}
          sentiment={selectedNews.sentiment}
        />
      )}

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

export default AIPanel;
