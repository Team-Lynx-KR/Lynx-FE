import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const downloadUrl = import.meta.env.VITE_DOWNLOAD_URL;
    
    if (downloadUrl) {
      // 환경 변수에 다운로드 URL이 설정되어 있으면 파일 다운로드
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Lynx-Setup.exe'; // 다운로드될 파일명
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // 다운로드 URL이 없으면 회원가입 페이지로 이동
      navigate('/signup');
    }
  };

  return (
    <section className="py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl text-purple-100 mb-8">무료로 시작하고, 언제든지 업그레이드하세요</p>
          <button
            onClick={handleDownload}
            className="px-8 py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90 flex items-center gap-2 mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            다운로드 하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
