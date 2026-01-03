import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Favorites from './pages/favorites/Favorites';
import Header from './components/layout/Header';
import { designTokens } from './design/tokens';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/onboarding/Onboarding';
import Landing from './pages/onboarding/Landing';

function App() {
  // 로컬 스토리지에서 인증 상태 확인 (상태로 관리하여 변경 감지)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  // localStorage 변경 감지
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
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
                  style={{ backgroundColor: designTokens.colors.dark[900] }}
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
                  style={{ backgroundColor: designTokens.colors.dark[900] }}
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
