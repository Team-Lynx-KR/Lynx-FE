import { useState } from 'react';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal = ({ onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [checkSpam, setCheckSpam] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-md p-10 relative border border-dark-700 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-dark-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-5">비밀번호 찾기</h2>

        {/* Instructions */}
        <p className="text-dark-400 mb-8 leading-relaxed">
          가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-300 mb-2.5">
            이메일 주소
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-dark-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full pl-12 pr-4 py-3.5 bg-[#262626] border-2 border-purple-500 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={checkSpam}
            onChange={(e) => setCheckSpam(e.target.checked)}
            className="w-4 h-4 rounded border-dark-600 bg-[#262626] text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
          />
          <span className="text-sm text-dark-400">
            메일이 오지 않는다면 스팸 메일함을 확인해주세요.
          </span>
        </label>

        {/* Send Button */}
        <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:via-purple-600 hover:to-blue-600 transition-all mb-5 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
          <span>재설정 링크 보내기</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            계정이 기억나셨나요? 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

