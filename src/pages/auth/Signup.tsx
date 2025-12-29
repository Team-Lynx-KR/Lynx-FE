import { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from '../../components/auth/TermsModal';
import PrivacyModal from '../../components/auth/PrivacyModal';
import logo from '@/assets/img/logo.svg';
import googleLogo from '../../assets/img/google-logo.svg';
import kakaoLogo from '../../assets/img/kakao-logo.svg';

const Signup = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black relative p-8">
      {/* Ambient Light Effects */}
      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-900/20 via-blue-800/10 to-transparent pointer-events-none"></div>

      {/* Left Panel - Branding */}
      <div className="relative flex-1 bg-gradient-to-br p-8 flex flex-col justify-between rounded-2xl mr-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <img src={logo} alt="LYNX Logo" className="w-9 h-9" />
            <span className="text-3xl font-bold text-white tracking-tight">LYNX</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold text-white leading-tight">AI와 함께하는</h1>
          <h1 className="text-5xl font-bold text-white mb-8 leading-tight">스마트 투자</h1>

          {/* Description */}
          <p className="text-xl text-white/50 leading-relaxed">기존 HTS의 불편함을 없애고</p>
          <p className="text-xl text-white/50 mb-16 leading-relaxed">
            AI 비서와 함께 매매하는 차세대 트레이딩 플랫폼
          </p>

          {/* Features */}
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">AI 투자 비서</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  실시간 뉴스와 보조지표 분석으로 매매 전략 제안
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">멀티 차트 대시보드</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  커스텀 가능한 차트로 여러 종목 동시 모니터링
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <svg
                  className="w-7 h-7 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">안전한 API 연동</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  로컬 저장으로 보안 강화, 서버 전송 없음
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-[600px] bg-[#1a1a1a]/80 border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-10 flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">회원가입</h2>
          <p className="text-dark-400 text-sm mb-8">LYNX 계정을 만들어보세요</p>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-2">이름</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="홍길동"
                className="w-full pl-10 pr-4 py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-2">이메일</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-2">비밀번호</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-300 mb-2">비밀번호 확인</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:via-purple-600 hover:to-blue-600 transition-all mb-6 shadow-lg shadow-purple-500/20">
            회원가입
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1a1a1a]/80 backdrop-blur-xl text-dark-500">또는</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 text-white rounded-lg hover:bg-[#2d2d2d]/80 hover:border-white/20 transition-all flex items-center justify-center gap-3">
              <img src={googleLogo} alt="Google" className="w-5 h-5" />
              <span>Google로 계속하기</span>
            </button>
            <button className="w-full py-3 bg-[#262626]/60 backdrop-blur-sm border border-white/10 text-white rounded-lg hover:bg-[#2d2d2d]/80 hover:border-white/20 transition-all flex items-center justify-center gap-3">
              <img src={kakaoLogo} alt="Kakao" className="w-5 h-5" />
              <span>Kakao로 계속하기</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-dark-400">
            <span>이미 계정이 있으신가요? </span>
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              로그인
            </Link>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-6 text-xs text-center text-dark-500">
            로그인하면 LYNX의{' '}
            <button
              onClick={() => setShowTerms(true)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              이용약관
            </button>
            {' 및 '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              개인정보처리방침
            </button>
            에 동의하게 됩니다.
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default Signup;
