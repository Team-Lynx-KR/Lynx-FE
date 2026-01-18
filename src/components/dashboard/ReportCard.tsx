interface IndicatorCardProps {
  stockName?: string;
  onClick?: () => void;
}

const IndicatorCard = ({ stockName: _stockName = '삼성전자', onClick }: IndicatorCardProps) => {
  return (
    <div
      className="rounded-lg border border-dark-800 p-4 flex flex-col cursor-pointer hover:opacity-90 transition-opacity duration-200 h-full"
        style={{ backgroundColor: 'var(--color-dark-800)' }}
      onClick={onClick}
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold text-dark-100">보조지표 분석</h3>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">RSI(14)</span>
              <span className="text-xs font-semibold text-warning-400">32.5</span>
            </div>
            <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-warning-400 rounded-full"
                style={{ width: '32.5%' }}
              />
            </div>
            <div className="text-xs text-dark-500 mt-0.5">과매도 구간</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">MACD</span>
              <span className="text-xs font-semibold text-error-500">양전환</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-dark-500">
              <span>Signal: -0.5</span>
              <span>Histogram: +1.2</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">이동평균</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs">
              <div>
                <span className="text-dark-500">MA5</span>
                <span className="text-dark-100 ml-1">71,200</span>
              </div>
              <div>
                <span className="text-dark-500">MA20</span>
                <span className="text-dark-100 ml-1">70,800</span>
              </div>
              <div>
                <span className="text-dark-500">MA60</span>
                <span className="text-dark-100 ml-1">70,500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-dark-700">
          <div className="text-xs text-dark-400 mb-1">예측 (종가 기준)</div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-500">다음 5일</span>
            <span className="text-xs font-semibold text-purple-400">+2.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCard;

