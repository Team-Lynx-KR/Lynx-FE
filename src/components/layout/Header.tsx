import { designTokens } from '@/design/tokens';

const Header = () => {
  return (
    <header
      className="border-dark-800 flex items-center justify-between px-6 py-4 mb-4"
      style={{ backgroundColor: designTokens.colors.dark[800] }}
    >
      <div className="flex items-center gap-6 flex-1">
        {/* 검색바 */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="종목명을 입력해주세요! (예: 네이버)"
            className="w-full px-4 py-2 border border-dark-700 rounded-md text-sm text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-dark-300 focus:border-transparent transition-all duration-200"
            style={{ backgroundColor: designTokens.colors.dark[700] }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-dark-300 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
