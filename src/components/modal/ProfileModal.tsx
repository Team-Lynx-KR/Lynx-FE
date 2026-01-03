import { designTokens } from '../../design/tokens';
import { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [name, setName] = useState('사용자');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('010-1234-5678');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-w-lg p-6 relative border border-dark-700 shadow-2xl"
        style={{ backgroundColor: designTokens.colors.dark[800] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-dark-400 hover:text-dark-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-dark-100 mb-6">프로필</h2>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              프로필 사진 변경
            </button>
          </div>

          {/* 사용자 정보 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-dark-400 mb-2">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-dark-400 mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-dark-400 mb-2">전화번호</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* 계정 정보 */}
          <div className="pt-4 border-t border-dark-700">
            <h3 className="text-base font-semibold text-dark-100 mb-4">계정 정보</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">계정 생성일</span>
                <span className="text-sm text-dark-100">2024.01.15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">마지막 로그인</span>
                <span className="text-sm text-dark-100">2024.01.20 14:30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-dark-400">계정 상태</span>
                <span className="text-sm text-success">활성</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-dark-700 hover:bg-dark-600 text-dark-100 rounded-lg font-semibold transition-colors duration-200"
          >
            취소
          </button>
          <button
            onClick={() => {
              // TODO: 프로필 저장 로직
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

