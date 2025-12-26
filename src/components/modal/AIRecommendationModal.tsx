import { designTokens } from '../../design/tokens';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockName: string;
  stockCode: string;
}

const AIRecommendationModal = ({
  isOpen,
  onClose,
  stockName,
  stockCode,
}: AIRecommendationModalProps) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl max-h-[90vh] rounded-lg border border-dark-700 flex flex-col"
          style={{ backgroundColor: designTokens.colors.dark[800] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: '#a855f7' }}
              >
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-dark-100">AI 매매 추천 상세 분석</h2>
                <p className="text-sm text-dark-400 mt-1">
                  {stockName} ({stockCode})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-dark-400 mb-1">종합 신뢰도</p>
                <p className="text-2xl font-bold text-dark-100">78%</p>
              </div>
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
          </div>

          {/* 스크롤 가능한 컨텐츠 영역 (스크롤바 숨김) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
            <div className="space-y-6">
              {/* 매수 추천 섹션 */}
              <div
                className="rounded-lg p-5"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <h3 className="text-base font-semibold text-dark-100">매수 추천</h3>
                </div>
                <p className="text-sm text-dark-300">현재가 대비 8-12% 상승 예상</p>
              </div>

              {/* 보조지표 상세 분석 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-info-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="text-base font-semibold text-dark-100">보조지표 상세 분석</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* RSI */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">RSI(14)</span>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f59e0b', color: '#fff' }}>
                        oversold
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-dark-100">32.5</p>
                  </div>

                  {/* MACD */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">MACD</span>
                      <span className="text-xs px-2 py-1 rounded text-error-500">positive</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-100">양전환</p>
                  </div>

                  {/* Stochastic */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">Stochastic</span>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f59e0b', color: '#fff' }}>
                        oversold
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-dark-100">25.3</p>
                  </div>

                  {/* Volume */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">Volume</span>
                      <span className="text-xs px-2 py-1 rounded text-error-500">high</span>
                    </div>
                    <p className="text-lg font-semibold text-dark-100">+145%</p>
                  </div>

                  {/* Bollinger Bands */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">Bollinger Bands</span>
                      <span className="text-xs px-2 py-1 rounded text-warning-400">support</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-100">하단접촉</p>
                  </div>

                  {/* MA(20) */}
                  <div
                    className="rounded-lg border border-dark-700 p-4"
                    style={{ backgroundColor: designTokens.colors.dark[700] }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">MA(20)</span>
                      <span className="text-xs px-2 py-1 rounded text-error-500">positive</span>
                    </div>
                    <p className="text-sm font-semibold text-dark-100">골든크로스</p>
                  </div>
                </div>
              </div>

              {/* 추천 매매 전략 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-base font-semibold text-dark-100">추천 매매 전략</h3>
                </div>
                <div
                  className="rounded-lg border border-dark-700 p-5"
                  style={{ backgroundColor: designTokens.colors.dark[700] }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-dark-400 mb-1">진입가</p>
                      <p className="text-sm font-semibold text-dark-100">71,000 - 72,000원</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 mb-1">목표가 1차</p>
                      <p className="text-sm font-semibold text-success-500">77,000원 (+8.5%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 mb-1">목표가 2차</p>
                      <p className="text-sm font-semibold text-success-500">80,000원 (+12%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 mb-1">손절가</p>
                      <p className="text-sm font-semibold text-error-500">68,000원 (-4.2%)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 위험 요소 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-base font-semibold text-warning-400">주의해야 할 위험 요소</h3>
                </div>
                <div
                  className="rounded-lg border border-dark-700 p-5"
                  style={{ backgroundColor: designTokens.colors.dark[700] }}
                >
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-dark-300">글로벌 반도체 수급 불안정성</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-dark-300">환율 변동에 따른 실적 영향</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-dark-300">경쟁사 신제품 출시 일정</p>
                    </li>
                  </ul>
                </div>
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
              나중에 결정
            </button>
            <button
              className="flex-1 px-4 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              매수 주문하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIRecommendationModal;

