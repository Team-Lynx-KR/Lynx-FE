import { designTokens } from '../../design/tokens';

interface IndicatorAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockName: string;
  stockCode: string;
}

const IndicatorAnalysisModal = ({
  isOpen,
  onClose,
  stockName,
  stockCode,
}: IndicatorAnalysisModalProps) => {
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
            <div>
              <h2 className="text-lg font-semibold text-dark-100">보조지표 상세 분석</h2>
              <p className="text-sm text-dark-400 mt-1">
                {stockName} ({stockCode}) - 실시간 업데이트
              </p>
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

          {/* 스크롤 가능한 컨텐츠 영역 (스크롤바 숨김) */}
          <div
            className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* 좌측: 차트 섹션 */}
            <div className="space-y-6">
              {/* RSI 섹션 */}
              <div
                className="rounded-lg border border-dark-700 p-5"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
              >
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-dark-100 mb-1">
                    RSI (Relative Strength Index)
                  </h3>
                  <p className="text-xs text-dark-400">상대강도지수 - 과매도 구간</p>
                </div>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-dark-100 mb-1">32.5</p>
                  <p className="text-xs text-dark-400">14일 기준</p>
                </div>
                {/* RSI 차트 영역 */}
                <div className="h-48 rounded border border-dark-600 mb-4 flex items-center justify-center">
                  <div className="text-sm text-dark-400">RSI 차트 영역</div>
                </div>
                {/* 해석 */}
                <div
                  className="rounded p-3"
                  style={{ backgroundColor: designTokens.colors.info[500] + '20' }}
                >
                  <p className="text-sm text-dark-200 leading-relaxed">
                    RSI가 30 이하로 과매도 구간에 진입했습니다. 단기 반등 가능성이 높으며, 매수
                    타이밍을 고려할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* MACD 섹션 */}
              <div
                className="rounded-lg border border-dark-700 p-5"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
              >
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-dark-100 mb-1">
                    MACD (Moving Average Convergence Divergence)
                  </h3>
                  <p className="text-xs text-dark-400">이동평균 수렴확산 - 양전환 신호</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-dark-100 mb-1">골든크로스</p>
                  <p className="text-xs text-dark-400">12, 26, 9</p>
                </div>
                {/* MACD 차트 영역 */}
                <div className="h-48 rounded border border-dark-600 mb-4 flex items-center justify-center">
                  <div className="text-sm text-dark-400">MACD 차트 영역</div>
                </div>
                {/* 해석 */}
                <div
                  className="rounded p-3"
                  style={{ backgroundColor: designTokens.colors.success[500] + '20' }}
                >
                  <p className="text-sm text-dark-200 leading-relaxed">
                    MACD 선이 Signal 선을 상향 돌파하여 골든크로스가 발생했습니다. 상승 추세 전환
                    신호로 해석됩니다.
                  </p>
                </div>
              </div>

              {/* 종합 기술적 분석 */}
              <div
                className="rounded-lg border border-dark-700 p-5"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-5 h-5 text-info-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="text-base font-semibold text-dark-100">종합 기술적 분석</h3>
                </div>
                <p className="text-sm text-dark-300 leading-relaxed">
                  현재 여러 보조지표가 동시에 매수 신호를 나타내고 있습니다. RSI와 Stochastic이
                  과매도 구간에 있으며, MACD는 골든크로스를 형성했습니다. 볼린저 밴드 하단 접촉으로
                  단기 반등 가능성이 높습니다. 다만, 추가 하락 가능성을 대비한 손절 라인 설정이
                  필요합니다.
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
              닫기
            </button>
            <button
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
              style={{
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
              }}
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndicatorAnalysisModal;
