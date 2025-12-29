import { designTokens } from '../../design/tokens';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsTitle: string;
  newsTime: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const NewsDetailModal = ({
  isOpen,
  onClose,
  newsTitle,
  newsTime,
  sentiment,
}: NewsDetailModalProps) => {
  if (!isOpen) return null;

  const sentimentColors = {
    positive: 'text-success-400',
    negative: 'text-error-400',
    neutral: 'text-info-400',
  };

  const sentimentLabels = {
    positive: '긍정',
    negative: '부정',
    neutral: '중립',
  };

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
            <h2 className="text-lg font-semibold text-dark-100">뉴스 상세</h2>
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
            {/* 뉴스 헤드라인 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-dark-100 mb-3">{newsTitle}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-400">{newsTime}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${sentimentColors[sentiment]}`}
                  style={{
                    backgroundColor:
                      sentiment === 'positive'
                        ? designTokens.colors.success[500] + '20'
                        : sentiment === 'negative'
                          ? designTokens.colors.error[500] + '20'
                          : designTokens.colors.info[500] + '20',
                  }}
                >
                  {sentimentLabels[sentiment]}
                </span>
              </div>
            </div>

            {/* 뉴스 상세 내용 */}
            <div className="mb-6">
              <p className="text-sm text-dark-300 leading-relaxed mb-4">
                업계 관계자들은 이번 기술 개발이 시장에 긍정적인 영향을 미칠 것으로 전망하고 있으며,
                전문가들은 해당 기술 혁신으로 인해 3-6개월 내 실적 개선이 예상된다고 분석했습니다.
              </p>

              {/* 주요 포인트 */}
              <div
                className="rounded-lg border border-dark-700 p-4 mb-4"
                style={{ backgroundColor: designTokens.colors.dark[700] }}
              >
                <h4 className="text-base font-semibold text-dark-100 mb-3">주요 포인트</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                    <p className="text-sm text-dark-300">신기술 개발로 생산 효율성 30% 향상</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                    <p className="text-sm text-dark-300">예상 수익률 증가: 15-20%</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-400 mt-2 flex-shrink-0" />
                    <p className="text-sm text-dark-300">시장 점유율 확대 전망</p>
                  </li>
                </ul>
              </div>

              {/* 애널리스트 의견 */}
              <p className="text-sm text-dark-300 leading-relaxed">
                증권사 애널리스트들은 해당 종목에 대해 '매수' 의견을 유지하고 있으며, 목표주가를
                기존 대비 10% 상향 조정했습니다.
              </p>
            </div>

            {/* AI 영향 분석 */}
            <div
              className="rounded-lg border border-dark-700 p-4 mb-6"
              style={{ backgroundColor: designTokens.colors.dark[700] }}
            >
              <h4 className="text-base font-semibold text-dark-100">AI 분석</h4>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-dark-400 mb-2">주가 영향도</p>
                  <p className="text-lg font-semibold text-dark-100">+2.3% 예상</p>
                </div>
                <div>
                  <p className="text-sm text-dark-400 mb-2">신뢰도</p>
                  <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '85%',
                        background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
                      }}
                    />
                  </div>
                  <p className="text-sm text-dark-300 mt-1">85%</p>
                </div>
              </div>
            </div>

            {/* 관련 종목 */}
            <div
              className="rounded-lg border border-dark-700 p-4"
              style={{ backgroundColor: designTokens.colors.dark[700] }}
            >
              <h4 className="text-base font-semibold text-dark-100 mb-4">관련 종목</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-300">삼성전자</span>
                  <span className="text-sm font-semibold text-success-400">+0.99%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-300">SK하이닉스</span>
                  <span className="text-sm font-semibold text-error-400">-0.25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-300">LG전자</span>
                  <span className="text-sm font-semibold text-success-400">+0.21%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 액션 버튼 */}
          <div className="flex gap-3 p-6 border-t border-dark-700">
            <button
              className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              style={{
                backgroundColor: designTokens.colors.dark[700],
                color: designTokens.colors.dark[100],
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              공유
            </button>
            <button
              className="flex-1 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              원문 보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetailModal;
