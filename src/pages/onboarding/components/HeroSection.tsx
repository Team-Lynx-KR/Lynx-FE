import { designTokens } from '../../../design/tokens';
import StatsSection from './StatsSection';

const HeroSection = () => {

  return (
    <section
      className="pt-32 pb-24 px-8 flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: designTokens.colors.dark[900], minHeight: '100vh' }}
    >
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-sm font-medium text-purple-400">AI 기반 스마트 트레이딩</span>
      </div>

      {/* Main Headline */}
      <h1 className="md:text-7xl font-medium py-6">
        <span className="text-white">AI와 함께하는</span>
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          }}
        >
          차세대 투자
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="text-xl text-gray-300 max-w-2xl mb-12">
        기존 HTS의 불편함을 없애고, AI 비서와 함께 매매하는 전문 트레이더를 위한 플랫폼
      </p>

      <StatsSection />
    </section>
  );
};

export default HeroSection;
