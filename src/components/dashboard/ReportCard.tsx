interface IndicatorCardProps {
  stockName?: string;
  onClick?: () => void;
}

const IndicatorCard = ({ stockName: _stockName = '', onClick }: IndicatorCardProps) => {
  return (
    <div
      className="rounded-lg border border-dark-800 p-3 flex flex-col cursor-pointer hover:opacity-90 transition-opacity duration-200 h-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-dark-800)' }}
      onClick={onClick}
    >
      <div className="mb-2 flex-shrink-0">
        <h3 className="text-sm font-semibold text-dark-100">보조지표 분석</h3>
      </div>
      <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
        {/* RSI */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-dark-400">RSI(14)</span>
            <span className="text-xs font-semibold text-warning-400">32.5</span>
          </div>
          <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden">
            <div className="h-full bg-warning-400 rounded-full" style={{ width: '32.5%' }} />
          </div>
        </div>

        {/* MACD */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-dark-400">MACD</span>
            <span className="text-xs font-semibold text-error-500">양전환</span>
          </div>
          <div className="text-xs text-dark-500">Histogram: +1.2</div>
        </div>

        {/* 이동평균 */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-dark-400">이동평균</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div>
              <span className="text-dark-500">MA5</span>
              <span className="text-dark-100 ml-1">71.2K</span>
            </div>
            <div>
              <span className="text-dark-500">MA20</span>
              <span className="text-dark-100 ml-1">70.8K</span>
            </div>
            <div>
              <span className="text-dark-500">MA60</span>
              <span className="text-dark-100 ml-1">70.5K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCard;
