interface TermsModalProps {
  onClose: () => void;
}

const TermsModal = ({ onClose }: TermsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-800 rounded-xl w-full max-w-2xl max-h-[80vh] p-8 relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors z-10"
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">LYNX 이용약관</h2>
        </div>

        {/* Effective Date */}
        <p className="text-sm text-dark-500 mb-6">시행일: 2025년 1월 1일</p>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-6 text-dark-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">제1조 (목적)</h3>
              <p className="text-sm leading-relaxed">
                이 약관은 LYNX(이하 "회사")가 제공하는 AI 기반 주식 거래 플랫폼 서비스의
                이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 서비스 이용
                조건 및 절차 등에 관한 사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">제2조 (정의)</h3>
              <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  "서비스"란 회사가 제공하는 AI 기반 주식 분석 및 거래 지원 플랫폼을
                  의미합니다.
                </li>
                <li>
                  "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 회원 및
                  비회원을 의미합니다.
                </li>
                <li>
                  "회원"이란 서비스 이용계약을 체결하고 회사로부터 회원 ID를 부여받은 자를
                  의미합니다.
                </li>
                <li>
                  "API Key"란 증권사와의 연동을 위한 인증 정보를 의미합니다.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                제3조 (약관의 게시와 개정)
              </h3>
              <ul className="text-sm leading-relaxed space-y-2">
                <li>
                  1. 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에
                  게시합니다.
                </li>
                <li>
                  2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할
                  수 있습니다.
                </li>
                <li>
                  3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과
                  함께 서비스 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                제4조 (서비스의 제공 및 변경)
              </h3>
              <ul className="text-sm leading-relaxed space-y-2">
                <li>1. 실시간 주식 시세 정보 제공</li>
                <li>2. AI 기반 거래 전략 분석 및 추천</li>
                <li>3. 멀티 차트 대시보드 제공</li>
                <li>4. 기타 회사가 추가 개발하거나 제휴계약 등을 통해 이용자에게 제공하는 일체의 서비스</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                제5조 (서비스의 중단)
              </h3>
              <p className="text-sm leading-relaxed">
                회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의
                사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                제6조 (회원가입)
              </h3>
              <p className="text-sm leading-relaxed">
                이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
                동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                제7조 (개인정보보호)
              </h3>
              <p className="text-sm leading-relaxed">
                회사는 이용자의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의
                개인정보를 수집합니다. 회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를
                보호하기 위해 노력합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-6 pt-6 border-t border-dark-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;

