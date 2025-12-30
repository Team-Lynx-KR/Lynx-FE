import { designTokens } from '../../../design/tokens';

const Footer = () => {
  return (
    <footer
      className="py-16 px-8 border-t border-dark-700"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">LYNX</span>
            </div>
            <p className="text-gray-400 mb-4">AI와 함께하는 차세대 트레이딩 플랫폼</p>
            <p className="text-sm text-gray-500">© 2026 LYNX. All rights reserved.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">제품</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">기능</span>
              </li>
              <li>
                <span className="text-gray-400">가격</span>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  로드맵
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">지원</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  문서
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  고객센터
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  블로그
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  채용
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="pt-8 border-t border-dark-700 flex flex-wrap gap-6 justify-center md:justify-end">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            이용약관
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
