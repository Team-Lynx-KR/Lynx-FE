import { designTokens } from '../../design/tokens';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import SettingsModal from '../modal/SettingsModal';
import ProfileModal from '../modal/ProfileModal';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favoriteStocks, setFavoriteStocks] = useState<
    Array<{ name: string; code: string; price: number; changePercent: number }>
  >([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') !== 'light'
  );

  // 현재 경로에 따라 activeItem 설정
  const getActiveItem = () => {
    if (location.pathname === '/favorites') return '관심';
    if (location.pathname === '/dashboard') return '메인';
    return '메인';
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  // 경로 변경 감지
  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [location.pathname]);

  // 관심 종목 로드 (배지용)
  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
      setFavoriteStocks(favorites);
    };

    loadFavorites();

    // 관심 종목 변경 이벤트 리스너
    const handleFavoriteChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoriteStocksChanged', handleFavoriteChange);
    return () => {
      window.removeEventListener('favoriteStocksChanged', handleFavoriteChange);
    };
  }, []);

  // 테마 전환
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    
    // HTML 요소에 테마 클래스 추가/제거
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    // 테마 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
  };

  // 초기 테마 적용
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const menuItems = [
    { id: '메인', label: '메인', icon: 'main' },
    { id: '관심', label: '관심', icon: 'star' },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'main':
        return (
          <svg className="w-4 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a2 2 0 002 2h3m10-11l2 2m-2-2v10a2 2 0 01-2 2h-3m-6 0a2 2 0 002-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2m-6 0h6"
            />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside
      className="h-full flex-shrink-0 border-r border-dark-800"
      style={{ backgroundColor: designTokens.colors.dark[800], width: '80px' }}
    >
      <div className="flex flex-col h-full">
        {/* 상단 로고 영역 */}
        <div className="p-4 border-b border-dark-800 flex flex-col items-center">
          <img src={logo} alt="LYNX Logo" className="w-9 h-9" />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex-1 py-2">
          {menuItems.map((item) => {
            const handleClick = () => {
              if (item.id === '메인') {
                navigate('/dashboard');
              } else if (item.id === '관심') {
                navigate('/favorites');
              }
              // 최근은 아직 구현 안됨
            };

            return (
              <button
                key={item.id}
                onClick={handleClick}
                className={`relative w-full flex flex-col items-center gap-1 px-2 py-3 transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'text-dark-100 bg-dark-800'
                    : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'
                }`}
              >
                {getIcon(item.icon)}
                <span className="text-xs text-center leading-tight">{item.label}</span>
                {item.id === '관심' && favoriteStocks.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 하단 유틸리티 */}
        <div className="border-t">
          <div className="flex flex-col items-center">
            {/* 밝기/테마 */}
            <button
              onClick={toggleTheme}
              className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* 설정 */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            <div className="border-t border-dark-700">
              {/* 프로필 */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </aside>
  );
};

export default Sidebar;
