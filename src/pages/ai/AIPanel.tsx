import { designTokens } from '../../design/tokens';

const AIPanel = () => {
  return (
    <div className="h-full flex flex-col gap-4">
      {/* AI 매매 추천 */}
      <div
        className="rounded-lg border border-dark-800 p-4"
        style={{ backgroundColor: designTokens.colors.dark[800] }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* AI 아이콘 */}
            <svg
              className="w-5 h-5 text-dark-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="text-base font-semibold text-dark-100">AI 매매 추천</h3>
          </div>
          {/* 별 아이콘 */}
          <svg
            className="w-4 h-4 text-warning-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <button className="w-full px-4 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg font-semibold transition-colors duration-200 mb-3">
          매수
        </button>
        <div className="text-sm text-dark-300 mb-2">
          <span className="text-dark-400">신뢰도 </span>
          <span className="font-semibold text-dark-100">78%</span>
        </div>
        {/* 진행 바 */}
        <div className="w-full h-2 bg-dark-700 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: '78%',
              background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
            }}
          />
        </div>
        <p className="text-xs text-dark-400 leading-relaxed">
          RSI 과매도 구간 진입, 거래량 급증, 긍정 뉴스 3건 감지
        </p>
      </div>

      {/* 보조지표 분석 */}
      <div
        className="rounded-lg border border-dark-800 p-4"
        style={{ backgroundColor: designTokens.colors.dark[800] }}
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
          <div className="flex items-start gap-2">
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
          <div className="flex items-start gap-2">
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
          <div className="flex items-start gap-2">
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
          <div className="flex items-start gap-2">
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
  );
};

export default AIPanel;
