import { useNavigate } from 'react-router-dom';
import { designTokens } from '../../../design/tokens';

const PricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      subtitle: '개인 투자자를 위한 기본 플랜',
      price: '무료',
      isPopular: false,
      features: ['실시간 시세 조회', '기본 차트 (2개)', 'AI 추천 (월 10회)', '커뮤니티 지원'],
      buttonText: '시작하기',
      buttonStyle: 'bg-dark-700 hover:bg-dark-600',
    },
    {
      name: 'Pro',
      subtitle: '전문 트레이더를 위한 프리미엄',
      price: '₩N/월',
      isPopular: true,
      features: [
        '무제한 실시간 시세',
        '멀티 차트 (무제한)',
        'AI 추천 (무제한)',
        '전용 고객 지원',
        '고급 보조지표',
        'API 우선 처리',
      ],
      buttonText: '시작하기',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90',
    },
    {
      name: 'Enterprise',
      subtitle: '기관 투자자를 위한 맞춤형',
      price: '₩N/월',
      isPopular: false,
      features: [
        'Pro 플랜 모든 기능',
        '전담 계정 매니저',
        '맞춤형 AI 모델',
        '우선 기술 지원',
        'SLA 보장',
        '온프레미스 배포',
      ],
      buttonText: '시작하기',
      buttonStyle: 'bg-dark-700 hover:bg-dark-600',
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 px-8"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          합리적인 가격
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16">
          당신의 투자 스타일에 맞는 플랜을 선택하세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-dark-800 rounded-xl p-8 border-2 ${
                plan.isPopular
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/20 relative'
                  : 'border-dark-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                    }}
                  >
                    인기
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.subtitle}</p>

              <div className="mb-8">
                <div className="text-4xl font-bold text-white">{plan.price}</div>
              </div>

              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all mb-8 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
