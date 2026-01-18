import { useNavigate } from 'react-router-dom';
import { designTokens } from '../../../design/tokens';
import logo from '@/assets/img/logo.svg';

const LandingHeader = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        backgroundColor: `${designTokens.colors.dark[900]}CC`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="LYNX Logo" className="w-9 h-9" />
        <span className="text-xl font-bold text-white">LYNX</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => scrollToSection('features')}
          className="text-white hover:text-purple-400 transition-colors"
        >
          기능
        </button>
        <button
          onClick={() => scrollToSection('pricing')}
          className="text-white hover:text-purple-400 transition-colors"
        >
          가격
        </button>
        <button
          onClick={() => scrollToSection('faq')}
          className="text-white hover:text-purple-400 transition-colors"
        >
          FAQ
        </button>
      </nav>

      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        <button
          onClick={() => navigate('/login')}
          className="text-white hover:text-purple-400 transition-colors"
        >
          로그인
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-base text-white transition-all hover:opacity-90 flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          }}
        >
          다운로드
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
    </header>
  );
};

export default LandingHeader;
