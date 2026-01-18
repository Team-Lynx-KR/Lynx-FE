import { useNavigate } from 'react-router-dom';
import { designTokens } from '../../design/tokens';
import Landing from './Landing';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // 온보딩 완료 표시
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/login');
  };

  const handleLogin = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/login');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // main 요소를 찾아서 해당 요소 내에서 스크롤
      const mainElement = document.querySelector('main');
      if (mainElement) {
        const elementTop = element.offsetTop;
        mainElement.scrollTo({
          top: elementTop - 100, // 헤더 높이만큼 여유 공간
          behavior: 'smooth',
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      {/* Main Content - Scrollable */}
      <main className="flex-1 w-full overflow-y-auto">
        <Landing />
      </main>
    </div>
  );
};

export default Onboarding;
