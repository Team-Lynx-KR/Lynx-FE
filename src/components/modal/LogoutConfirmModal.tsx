import { designTokens } from '../../design/tokens';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-w-md p-6 relative border border-dark-700 shadow-2xl"
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

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-error-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-error-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-dark-100 mb-4 text-center">로그아웃</h2>

        {/* Message */}
        <p className="text-dark-300 mb-8 text-center leading-relaxed">
          정말 로그아웃 하시겠습니까?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-dark-700 hover:bg-dark-600 text-dark-100 rounded-lg font-semibold transition-colors duration-200"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-error-600 hover:bg-error-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
