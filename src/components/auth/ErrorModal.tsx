interface ErrorModalProps {
  onClose: () => void;
  message: string;
}

const ErrorModal = ({ onClose, message }: ErrorModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-md p-10 relative border border-red-500/30 shadow-2xl">
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

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">오류</h2>

        {/* Message */}
        <p className="text-dark-300 mb-8 text-center leading-relaxed">{message}</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-600 transition-all"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;

