import { useState } from 'react';
import { designTokens } from '../../../design/tokens';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'LYNX는 어떤 증권사와 연동되나요?',
      answer:
        'LYNX는 국내 주요 증권사와 API를 통해 연동됩니다. 현재는 삼성증권, 키움증권, 한국투자증권 등을 지원하며, 추가 증권사 연동을 지속적으로 확대하고 있습니다.',
    },
    {
      question: 'API 키는 안전한가요?',
      answer:
        '네, API 키는 완전히 로컬 환경에 암호화되어 저장되며, 서버로 전송되지 않습니다. 모든 거래는 사용자의 컴퓨터에서 직접 증권사 API로 전송되므로 최고 수준의 보안을 보장합니다.',
    },
    {
      question: 'AI 추천은 얼마나 정확한가요?',
      answer:
        'LYNX의 AI 모델은 실시간 뉴스 분석, 기술적 지표, 시장 데이터를 종합적으로 분석하여 추천을 제공합니다. 현재 평균 85%의 신뢰도를 보이고 있으며, 지속적으로 학습하여 정확도를 향상시키고 있습니다.',
    },
    {
      question: '환불 정책은 어떻게 되나요?',
      answer:
        'Pro 플랜의 경우 구독 후 14일 이내에 환불을 요청하시면 전액 환불해드립니다. Enterprise 플랜은 개별 계약에 따라 다르므로 고객센터로 문의해주세요.',
    },
    {
      question: '데스크톱 앱과 웹 버전의 차이는?',
      answer:
        '데스크톱 앱은 더 빠른 성능과 오프라인 기능, 시스템 통합 기능을 제공합니다. 웹 버전은 별도의 설치 없이 브라우저에서 바로 사용할 수 있어 접근성이 높습니다. 기능적으로는 거의 동일하며, 사용자의 환경에 맞게 선택하실 수 있습니다.',
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 px-8"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          자주 묻는 질문
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16">궁금한 점이 있으신가요?</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-dark-700 transition-colors"
              >
                <span className="text-white font-medium pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-6 pb-5 text-gray-400">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
