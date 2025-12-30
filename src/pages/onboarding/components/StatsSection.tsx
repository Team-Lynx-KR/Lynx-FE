import { designTokens } from '../../../design/tokens';

const StatsSection = () => {
  const stats = [
    { value: '+ N명', label: '활성 사용자' },
    { value: '+ N개', label: '일일 거래량' },
    { value: '+ N%', label: 'AI 신뢰도' },
    { value: '+ N%', label: '평균 수익률' },
  ];

  return (
    <section className="py-10" style={{ backgroundColor: designTokens.colors.dark[900] }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-dark-800 rounded-xl p-6 text-center border border-dark-700"
          >
            <div
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                background: 'white',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
