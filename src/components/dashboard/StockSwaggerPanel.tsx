/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  getKISAuthToken,
  getKISWebSocketAuth,
  searchStock,
  syncStockMaster,
  getStockMasterCount,
  collectStockPrice,
  collectStockPriceFull,
  transformStockFeature,
} from '../../api/stock';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const StockSwaggerPanel = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');
  const [requestData, setRequestData] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      method: 'POST',
      path: '/stock/kis/restapi/auth/token',
      name: 'KIS REST API 인증 토큰 발급',
      description: 'KIS REST API 인증 토큰을 발급합니다.',
      params: {},
    },
    {
      method: 'POST',
      path: '/stock/kis/websocket/auth/approval',
      name: 'KIS WebSocket 접속키 발급',
      description: 'KIS WebSocket 접속을 위한 승인 키를 발급합니다.',
      params: {},
    },
    {
      method: 'POST',
      path: '/stock/search',
      name: '종목 검색',
      description: '키워드로 종목을 검색합니다.',
      params: {
        keyword: '',
        market: '',
      },
    },
    {
      method: 'POST',
      path: '/stock/master/sync',
      name: '종목 마스터 데이터 수동 동기화',
      description: '종목 마스터 데이터를 수동으로 동기화합니다. (관리자용)',
      params: {},
    },
    {
      method: 'GET',
      path: '/stock/master/count',
      name: '종목 마스터 데이터 개수 조회',
      description: '종목 마스터 데이터 개수를 조회합니다. (관리자용)',
      params: {},
    },
    {
      method: 'POST',
      path: '/stock/price/collect',
      name: '일봉 데이터 수동 수집 (증분 업데이트)',
      description: '일봉 데이터를 증분 업데이트 방식으로 수집합니다. (관리자용)',
      params: {},
    },
    {
      method: 'POST',
      path: '/stock/price/collect-full',
      name: '일봉 데이터 전체 수동 수집',
      description: '일봉 데이터를 전체 수집합니다. (관리자용)',
      params: {},
    },
    {
      method: 'POST',
      path: '/stock/feature/transform',
      name: '등락률 데이터 계산',
      description: '등락률 데이터를 계산합니다. (관리자용)',
      params: {},
    },
  ];

  const handleEndpointSelect = (endpoint: (typeof endpoints)[0]) => {
    setSelectedEndpoint(endpoint.path);
    setRequestData(endpoint.params);
    setResponse(null);
  };

  const handleInputChange = (key: string, value: any) => {
    setRequestData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExecute = async () => {
    if (!selectedEndpoint) return;

    setLoading(true);
    setResponse(null);

    try {
      let result: any;

      switch (selectedEndpoint) {
        case '/stock/kis/restapi/auth/token':
          result = await getKISAuthToken();
          break;
        case '/stock/kis/websocket/auth/approval':
          result = await getKISWebSocketAuth();
          break;
        case '/stock/search':
          result = await searchStock({
            keyword: requestData.keyword || '',
            market: requestData.market || undefined,
          });
          break;
        case '/stock/master/sync':
          await syncStockMaster();
          result = { message: '동기화 완료' };
          break;
        case '/stock/master/count':
          result = await getStockMasterCount();
          break;
        case '/stock/price/collect':
          await collectStockPrice();
          result = { message: '수집 완료' };
          break;
        case '/stock/price/collect-full':
          await collectStockPriceFull();
          result = { message: '전체 수집 완료' };
          break;
        case '/stock/feature/transform':
          await transformStockFeature();
          result = { message: '계산 완료' };
          break;
        default:
          throw new Error('알 수 없는 엔드포인트');
      }

      setResponse({
        success: true,
        data: result,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        error: error.response?.data?.message || error.message || '알 수 없는 오류',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedEndpointInfo = endpoints.find((e) => e.path === selectedEndpoint);

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-200">Stock API 테스트</h2>
        <p className="text-sm text-gray-400 mt-1">Stock API 엔드포인트를 테스트합니다</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: 엔드포인트 목록 */}
        <div className="w-80 border-r border-gray-700 overflow-y-auto">
          <div className="p-3 space-y-2">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.path}
                onClick={() => handleEndpointSelect(endpoint)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedEndpoint === endpoint.path
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${
                      selectedEndpoint === endpoint.path
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                </div>
                <div className="text-sm font-medium">{endpoint.name}</div>
                <div className="text-xs mt-1 opacity-75">{endpoint.path}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 요청/응답 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedEndpointInfo ? (
            <>
              {/* 요청 영역 */}
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <h3 className="text-sm font-semibold text-gray-200 mb-2">요청</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      {selectedEndpointInfo.description}
                    </div>
                    {Object.keys(selectedEndpointInfo.params).length > 0 ? (
                      <div className="space-y-2">
                        {Object.keys(selectedEndpointInfo.params).map((key) => (
                          <div key={key}>
                            <label className="block text-xs text-gray-400 mb-1">{key}</label>
                            <input
                              type="text"
                              value={requestData[key] || ''}
                              onChange={(e) => handleInputChange(key, e.target.value)}
                              placeholder={`${key} 입력...`}
                              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">파라미터 없음</div>
                    )}
                  </div>
                  <button
                    onClick={handleExecute}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
                  >
                    {loading ? '실행 중...' : '실행'}
                  </button>
                </div>
              </div>

              {/* 응답 영역 */}
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-200 mb-2">응답</h3>
                {response ? (
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div
                      className={`text-sm font-semibold mb-2 ${
                        response.success ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {response.success ? '✅ 성공' : '❌ 실패'}
                    </div>
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words overflow-x-auto font-mono">
                      {JSON.stringify(response.data || response.error, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">응답이 없습니다</div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              엔드포인트를 선택하세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockSwaggerPanel;
