import { designTokens } from '../../../design/tokens';

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: '멀티 차트 대시보드',
      description: '3x3 그리드 레이아웃으로 9개 종목 동시 모니터링, 캔들스틱 차트와 실시간 주가 데이터 제공',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
      title: 'WebSocket 실시간 데이터',
      description: 'KIS WebSocket 자동 연결, 헤더에 연결 상태 표시 및 실시간 메시지 로그 패널 제공',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
      title: 'RSS 뉴스 피드',
      description: '주식 관련 뉴스 실시간 수집, 카테고리별 필터링 및 감정 분석 (긍정/부정/중립) 제공',
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'AI 투자 비서',
      description: '주가 변동 예측 및 매매 전략 제안, RSI/MACD 등 보조지표 기반 분석 제공',
      color: 'from-purple-500 to-purple-700',
    },
  ];

  return (
    <section
      id="features"
      className="py-16 px-8"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="md:text-5xl font-bold text-center text-white mb-4">강력한 기능들</h2>
        <p className="text-xl text-gray-400 text-center mb-16">
          전문 트레이더가 필요로 하는 모든 것
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-purple-500/50 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
