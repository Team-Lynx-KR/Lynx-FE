/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import WebSocketClient from '../../utils/websocket';
import { getKISWebSocketAuth } from '../../api/stock';

interface WebSocketLogPanelProps {
  wsUrl?: string;
  onConnect?: (connected: boolean) => void;
}

const WebSocketLogPanel = ({ wsUrl, onConnect }: WebSocketLogPanelProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<Array<{ timestamp: Date; data: any }>>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [filter, setFilter] = useState('');
  const wsClientRef = useRef<WebSocketClient | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wsUrl) return;

    const connectWebSocket = async () => {
      try {
        // KIS WebSocket 접속키 발급
        console.log('[WebSocket] 접속키 발급 시도...');
        const authResponse = await getKISWebSocketAuth();
        const approvalKey = authResponse.approval_key;

        console.log('[WebSocket] 접속키 발급 성공:', approvalKey);

        // WebSocket 클라이언트 생성
        const client = new WebSocketClient(wsUrl);
        wsClientRef.current = client;

        // 원시 메시지 핸들러 등록 (모든 메시지를 로그에 추가)
        client.onRawMessage((data) => {
          setLogs((prevLogs) => {
            const newLogs = [...prevLogs, { timestamp: new Date(), data }];
            // 최대 1000개까지만 유지
            return newLogs.slice(-1000);
          });
        });

        // 연결 상태 업데이트
        client.on('connected', () => {
          setIsConnected(true);
          onConnect?.(true);
          console.log('[WebSocket] 연결 성공');
        });

        // 연결
        await client.connect(approvalKey);
        setIsConnected(true);
        onConnect?.(true);
      } catch (error) {
        console.error('[WebSocket] 연결 실패:', error);
        setIsConnected(false);
        onConnect?.(false);
      }
    };

    connectWebSocket();

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.disconnect();
        wsClientRef.current = null;
      }
      setIsConnected(false);
      onConnect?.(false);
    };
  }, [wsUrl, onConnect]);

  // 자동 스크롤
  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  // 로그 필터링
  const filteredLogs = logs.filter((log) => {
    if (!filter) return true;
    const logStr = JSON.stringify(log.data, null, 2).toLowerCase();
    return logStr.includes(filter.toLowerCase());
  });

  const formatTimestamp = (date: Date) => {
    return (
      date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) +
      '.' +
      date.getMilliseconds().toString().padStart(3, '0')
    );
  };

  const formatLogData = (data: any) => {
    try {
      if (typeof data === 'string') {
        return data;
      }
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm font-medium text-gray-200">
              {isConnected ? '연결됨' : '연결 끊김'}
            </span>
          </div>
          <span className="text-xs text-gray-400">({filteredLogs.length}개 로그)</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="로그 필터..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-gray-700 border border-gray-600 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="w-3 h-3"
            />
            <span>자동 스크롤</span>
          </label>
          <button
            onClick={() => setLogs([])}
            className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors"
          >
            지우기
          </button>
        </div>
      </div>

      {/* 로그 영역 */}
      <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {logs.length === 0 ? '로그가 없습니다' : '필터 조건에 맞는 로그가 없습니다'}
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className="mb-2 p-2 bg-gray-800 rounded border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-gray-500 text-xs">{formatTimestamp(log.timestamp)}</span>
              </div>
              <pre className="text-gray-300 whitespace-pre-wrap break-words overflow-x-auto">
                {formatLogData(log.data)}
              </pre>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default WebSocketLogPanel;
