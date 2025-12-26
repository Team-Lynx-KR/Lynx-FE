import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/layout/Header';
import { designTokens } from './design/tokens';
import Sidebar from './components/layout/Sidebar';

function App() {
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
}

export default App;
