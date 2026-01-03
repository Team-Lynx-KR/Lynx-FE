import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Favorites from './pages/favorites/Favorites';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/onboarding/Onboarding';
import Landing from './pages/onboarding/Landing';
import { refreshToken } from './api/auth';

function App() {
  // 로컬 스토리지에서 인증 상태 확인 (상태로 관리하여 변경 감지)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );
  
  // 테마 상태 관리 (전체 앱 리렌더링을 위해)
  const [, setTheme] = useState(
    () => {
      const clickCount = parseInt(localStorage.getItem('themeClickCount') || '0', 10);
      return clickCount % 2 === 1 ? 'light' : 'dark';
    }
  );

  // localStorage 변경 감지 및 자동 로그인 처리
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const keepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';
      const storedRefreshToken = localStorage.getItem('refreshToken');

      // 자동 로그인이 설정되어 있고, 리프레시 토큰이 있지만 인증 상태가 없는 경우
      if (keepLoggedIn && storedRefreshToken && !authStatus) {
        try {
          console.log('[autologin] 자동 로그인 시도...');
          const tokenResponse = await refreshToken(storedRefreshToken);
          
          // 새 토큰 저장
          localStorage.setItem('token', tokenResponse.accessToken);
          localStorage.setItem('refreshToken', tokenResponse.refreshToken);
          localStorage.setItem('isAuthenticated', 'true');
          
          setIsAuthenticated(true);
          console.log('[autologin] ✅ 자동 로그인 성공!');
        } catch (error) {
          console.error('[autologin] ❌ 자동 로그인 실패:', error);
          // 자동 로그인 실패 시 토큰 제거
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('keepLoggedIn');
          localStorage.removeItem('isAuthenticated');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(authStatus);
      }
    };

    // 초기 확인
    checkAuth();

    // storage 이벤트 리스너 (다른 탭에서의 변경 감지)
    window.addEventListener('storage', checkAuth);

    // 커스텀 이벤트 리스너 (같은 탭에서의 변경 감지)
    window.addEventListener('authStateChanged', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, []);

  // 테마 변경 감지
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail);
    };

    window.addEventListener('themeChanged', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 랜딩 페이지 */}
        <Route path="/" element={<Landing />} />

        {/* 온보딩 페이지 */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* 인증 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 메인 대시보드 (인증 필요) */}
        <Route
          path="/dashboard"
          element={(() => {
            if (isAuthenticated) {
              return (
                <div
                  className="flex h-screen w-screen overflow-hidden"
                  style={{ backgroundColor: 'var(--color-dark-900)' }}
                >
                  {/* 사이드바 */}
                  <Sidebar />

                  {/* 컨텐츠 영역 */}
                  <div className="flex flex-1 flex-col overflow-hidden">
                    {/* 헤더 */}
                    <Header />

                    {/* 대시보드 */}
                    <main className="flex-1 overflow-auto scrollbar-thin">
                      <Dashboard />
                    </main>
                  </div>
                </div>
              );
            } else {
              console.log('[App] 인증되지 않음, 로그인으로 리다이렉트');
              return <Navigate to="/login" replace />;
            }
          })()}
        />

        {/* 관심 페이지 (인증 필요) */}
        <Route
          path="/favorites"
          element={(() => {
            if (isAuthenticated) {
              return (
                <div
                  className="flex h-screen w-screen overflow-hidden"
                  style={{ backgroundColor: 'var(--color-dark-900)' }}
                >
                  {/* 사이드바 */}
                  <Sidebar />

                  {/* 컨텐츠 영역 */}
                  <div className="flex flex-1 flex-col overflow-hidden">
                    {/* 헤더 */}
                    <Header />

                    {/* 관심 페이지 */}
                    <main className="flex-1 overflow-auto scrollbar-thin">
                      <Favorites />
                    </main>
                  </div>
                </div>
              );
            } else {
              console.log('[App] 인증되지 않음, 로그인으로 리다이렉트');
              return <Navigate to="/login" replace />;
            }
          })()}
        />

        {/* 404 - 랜딩 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
