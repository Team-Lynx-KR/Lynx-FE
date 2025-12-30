import { designTokens } from '../../../design/tokens';

// 대시보드 프리뷰 이미지 (assets 폴더에 dashboard-preview.png 파일 추가 필요)
// import dashboardPreview from '../../../assets/img/dashboard-preview.png';

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
          className="rounded-2xl p-6 border-2 border-purple-500/30 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${designTokens.colors.dark[800]} 0%, ${designTokens.colors.dark[900]} 100%)`,
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.3)',
          }}
        >
          {/* Dashboard Preview Image */}
          <div className="relative w-full rounded-lg overflow-hidden bg-dark-900">
            <img
              src="/dashboard-preview.png"
              alt="대시보드 프리뷰"
              className="w-full h-auto object-contain rounded-lg"
              style={{ maxHeight: '600px' }}
              onError={(e) => {
                // 이미지가 없을 경우 fallback
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder */}
            <div className="hidden flex-col items-center justify-center py-20">
              <div
                className="w-20 h-20 rounded-lg mb-6 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
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
              </div>
              <p className="text-gray-400 text-lg">대시보드 프리뷰</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceSection;
