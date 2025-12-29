interface PrivacyModalProps {
  onClose: () => void;
}

const PrivacyModal = ({ onClose }: PrivacyModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[80vh] p-10 relative flex flex-col border border-dark-700 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-dark-400 hover:text-white transition-colors z-10"
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
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">개인정보처리방침</h2>
        </div>

        {/* Effective Date */}
        <p className="text-sm text-dark-500 mb-8">시행일: 2025년 1월 1일</p>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
          <div className="space-y-6 text-dark-300">
            <div>
              <p className="text-sm leading-relaxed mb-4">
                LYNX(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법
                등 관련 법령상의 개인정보 보호 규정을 준수하며, 이용자의 개인정보 보호에 최선을
                다하고 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                1. 개인정보의 수집 및 이용 목적
              </h3>
              <p className="text-sm leading-relaxed mb-2">
                회사는 다음의 목적을 위해 개인정보를 수집 및 이용합니다:
              </p>
              <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside ml-2">
                <li>
                  <strong>회원 가입 및 관리:</strong> 회원제 서비스 제공, 본인 확인, 회원자격
                  유지·관리
                </li>
                <li>
                  <strong>서비스 제공:</strong> 실시간 시세 정보, AI 분석 서비스, 매매 추천 제공
                </li>
                <li>
                  <strong>마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트
                  정보 제공
                </li>
                <li>
                  <strong>서비스 개선:</strong> 서비스 이용 통계 분석, 사용자 경험 개선
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                2. 수집하는 개인정보 항목
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-white mb-2">[필수 항목]</p>
                  <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside ml-2">
                    <li>이메일 주소</li>
                    <li>비밀번호 (암호화 저장)</li>
                    <li>이름 (닉네임)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">[선택 항목]</p>
                  <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside ml-2">
                    <li>프로필 사진</li>
                    <li>휴대전화 번호(본인인증 선택 시)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">[자동 수집 항목]</p>
                  <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside ml-2">
                    <li>IP 주소, 쿠키, 서비스 이용 기록</li>
                    <li>기기 정보 (OS 버전, 화면 크기 등)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                3. 개인정보의 보유 및 이용기간
              </h3>
              <p className="text-sm leading-relaxed">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
                동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 회원 탈퇴 시
                즉시 파기하며, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안
                보관합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                4. 개인정보의 제3자 제공
              </h3>
              <p className="text-sm leading-relaxed">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의
                경우에는 예외로 합니다:
              </p>
              <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside ml-2 mt-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                5. 개인정보 처리의 위탁
              </h3>
              <p className="text-sm leading-relaxed">
                회사는 서비스 향상을 위해 필요한 경우 개인정보 처리업무를 외부 전문업체에 위탁할
                수 있으며, 이 경우 위탁받은 업체가 개인정보보호법에 따라 개인정보를 안전하게
                처리하도록 필요한 사항을 규정하고 관리·감독합니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                6. 정보주체의 권리·의무 및 행사방법
              </h3>
              <p className="text-sm leading-relaxed">
                이용자는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수
                있으며, 회사는 이러한 요구에 대해 지체 없이 조치하겠습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-6 pt-6 border-t border-dark-700">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:via-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/20"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;

