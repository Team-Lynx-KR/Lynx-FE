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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'AI 투자 비서',
      description: '실시간 뉴스 분석과 보조지표 기반의 정확한 매매 전략 제안',
      color: 'from-purple-500 to-purple-700',
    },
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
      title: '멀티 차트',
      description: '커스텀 가능한 대시보드로 여러 종목 동시 모니터링',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: '보안 강화',
      description: 'API 키 로컬 저장, 서버 전송 없는 안전한 거래 환경',
      color: 'from-green-500 to-green-700',
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
      title: '실시간 시세',
      description: 'WebSocket 기반 실시간 체결가와 호가 정보 제공',
      color: 'from-orange-500 to-orange-700',
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
