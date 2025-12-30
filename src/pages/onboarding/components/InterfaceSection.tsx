import { designTokens } from '../../../design/tokens';
import dashboard from '@/assets/img/dashboard.svg';

const InterfaceSection = () => {
  return (
    <section
      className="py-24 px-8"
      style={{
        background: `linear-gradient(135deg, ${designTokens.colors.purple[900]} 0%, ${designTokens.colors.purple[800]} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">직관적인 인터페이스</h2>
        <p className="text-xl text-purple-200 mb-12">
          복잡한 데이터를 한눈에 파악할 수 있는 대시보드
        </p>

        {/* Dashboard Preview */}
        <div
          className="rounded-2xl p-5 border-1 border-purple-500/30 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${designTokens.colors.dark[800]} 0%, ${designTokens.colors.dark[900]} 100%)`,
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.3)',
          }}
        >
          {/* Dashboard Preview Image */}
          <div className="rounded-lg overflow-hidden bg-dark-900">
            <img
              src={dashboard}
              alt="Dashboard Preview"
              className="w-full rounded-lg"
              style={{ maxHeight: '720px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceSection;
