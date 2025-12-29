import { useState } from 'react';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal = ({ onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [checkSpam, setCheckSpam] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-800 rounded-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors"
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
        <h2 className="text-2xl font-bold text-white mb-4">비밀번호 찾기</h2>

        {/* Instructions */}
        <p className="text-dark-400 mb-6">
          가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-300 mb-2">
            이메일 주소
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
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
              className="w-full pl-10 pr-4 py-3 bg-dark-700 border-2 border-purple-500 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={checkSpam}
            onChange={(e) => setCheckSpam(e.target.checked)}
            className="w-4 h-4 rounded border-dark-600 bg-dark-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
          />
          <span className="text-sm text-dark-400">
            메일이 오지 않는다면 스팸 메일함을 확인해주세요.
          </span>
        </label>

        {/* Send Button */}
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all mb-4 flex items-center justify-center gap-2">
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
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            계정이 기억나셨나요? 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

