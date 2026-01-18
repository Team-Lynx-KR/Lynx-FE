/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import WebSocketClient from '../../utils/websocket';

interface WebSocketStatusPanelProps {
  wsClient: WebSocketClient | null;
}

const WebSocketStatusPanel = ({ wsClient }: WebSocketStatusPanelProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<Array<{ timestamp: Date; data: any }>>([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    if (!wsClient) {
      setIsConnected(false);
      return;
    }

    // 연결 상태 확인
    const checkConnection = () => {
      setIsConnected(wsClient.isConnected());
    };

    // 주기적으로 연결 상태 확인
    const interval = setInterval(checkConnection, 1000);
    checkConnection(); // 초기 확인

    // 원시 메시지 핸들러 등록 (모든 메시지를 로그에 추가)
    const handleMessage = (data: any) => {
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, { timestamp: new Date(), data }];
        // 최대 100개까지만 유지 (작은 패널용)
        return newLogs.slice(-100);
      });
      checkConnection(); // 메시지 수신 시 연결 상태 업데이트
    };

    wsClient.onRawMessage(handleMessage);

    return () => {
      clearInterval(interval);
      wsClient.offRawMessage(handleMessage);
    };
  }, [wsClient]);

  return (
    <div className="relative">
      {/* 상태 표시 버튼 */}
      <button
        onClick={() => setShowLogs(!showLogs)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
          isConnected
            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
            : 'bg-red-500/20 border border-red-500/50 text-red-400'
        }`}
      >
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs font-medium">
          {isConnected ? 'WebSocket 연결됨' : 'WebSocket 연결 끊김'}
        </span>
        {logs.length > 0 && (
          <span className="text-xs bg-blue-500/30 px-1.5 py-0.5 rounded">{logs.length}</span>
        )}
      </button>

      {/* 로그 패널 (토글) */}
      {showLogs && (
        <div className="absolute top-full right-0 mt-2 w-96 h-96 bg-gray-900 rounded-lg border border-gray-700 shadow-xl z-50 flex flex-col overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-2 border-b border-gray-700 bg-gray-800">
            <span className="text-xs font-medium text-gray-200">WebSocket 로그</span>
            <button
              onClick={() => setLogs([])}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            >
              지우기
            </button>
          </div>

          {/* 로그 영역 */}
          <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">로그가 없습니다</div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 bg-gray-800 rounded border border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <div className="text-gray-500 text-xs mb-1">
                    {log.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                    .{log.timestamp.getMilliseconds().toString().padStart(3, '0')}
                  </div>
                  <pre className="text-gray-300 whitespace-pre-wrap break-words overflow-x-auto text-xs">
                    {typeof log.data === 'string' ? log.data : JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebSocketStatusPanel;
