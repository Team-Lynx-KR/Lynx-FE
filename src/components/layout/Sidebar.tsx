import { designTokens } from '../../design/tokens';
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('홈');

  const menuItems = [
    { id: '메인', label: '메인', icon: 'main' },
    { id: '관심', label: '관심', icon: 'star' },
    { id: '트레이딩', label: '트레이딩', icon: 'trading' },
    { id: '최근', label: '최근', icon: 'recently' },
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
      case 'trading':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
      case 'recently':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex flex-col items-center gap-1 px-2 py-3 transition-colors duration-200 ${
                activeItem === item.id
                  ? 'text-dark-100 bg-dark-800'
                  : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'
              }`}
            >
              {getIcon(item.icon)}
              <span className="text-xs text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 하단 유틸리티 */}
        <div className="border-t">
          <div className="flex flex-col items-center">
            {/* 밝기/테마 */}
            <button className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>

            {/* 설정 */}
            <button className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200">
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
              <button className="p-5 text-dark-400 hover:text-dark-100 hover:bg-dark-800 rounded-lg transition-colors duration-200">
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
    </aside>
  );
};

export default Sidebar;
