import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/layout/Header';
import { designTokens } from './design/tokens';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  // 임시: 로그인 상태 확인 (실제로는 인증 상태를 확인해야 함)
  const isAuthenticated = false; // TODO: 실제 인증 상태로 교체

  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 메인 대시보드 (인증 필요) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
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
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 기본 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
