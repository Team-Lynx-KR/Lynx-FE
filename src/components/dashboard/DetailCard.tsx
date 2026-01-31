import { designTokens } from '../../design/tokens';

interface DetailCardProps {
  title?: string;
  stockName?: string;
  onClick?: () => void;
}

const DetailCard = ({ title = '상세', stockName = '', onClick }: DetailCardProps) => {
  return (
    <div
      className="rounded-lg border border-dark-800 p-4 flex flex-col cursor-pointer hover:opacity-90 transition-opacity duration-200 h-full"
      style={{ backgroundColor: designTokens.colors.dark[800] }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-base font-semibold text-dark-100">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-3">
        <div>
          <div className="text-xs text-dark-400 mb-1">종목명</div>
          <div className="text-sm font-semibold text-dark-100">{stockName}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-dark-400 mb-1">거래량</div>
            <div className="text-xs font-medium text-dark-100">12.5M</div>
          </div>
          <div>
            <div className="text-xs text-dark-400 mb-1">시가총액</div>
            <div className="text-xs font-medium text-dark-100">428조</div>
          </div>
          <div>
            <div className="text-xs text-dark-400 mb-1">PER</div>
            <div className="text-xs font-medium text-dark-100">12.5</div>
          </div>
          <div>
            <div className="text-xs text-dark-400 mb-1">PBR</div>
            <div className="text-xs font-medium text-dark-100">1.2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
