import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/layout/Header';
import { designTokens } from './design/tokens';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  // 로컬 스토리지에서 인증 상태 확인
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <Routes>
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

        {/* 기본 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
