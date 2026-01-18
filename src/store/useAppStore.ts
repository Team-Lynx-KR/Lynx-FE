import { create } from 'zustand';

import WebSocketClient from '../utils/websocket';

interface AppState {
  // 예시 상태
  isConnected: boolean;
  selectedSymbol: string | null;
  // 검색으로 선택된 종목 (대시보드에 단일 종목만 표시할 때 사용)
  searchedStock: { code: string; name: string } | null;
  // WebSocket 연결 상태
  wsConnected: boolean;
  // WebSocket 클라이언트 인스턴스 (로그 접근용)
  wsClient: WebSocketClient | null;
  
  // 액션
  setConnected: (connected: boolean) => void;
  setSelectedSymbol: (symbol: string | null) => void;
  setSearchedStock: (stock: { code: string; name: string } | null) => void;
  setWsConnected: (connected: boolean) => void;
  setWsClient: (client: WebSocketClient | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isConnected: false,
  selectedSymbol: null,
  searchedStock: null,
  wsConnected: false,
  wsClient: null,
  
  setConnected: (connected) => set({ isConnected: connected }),
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  setSearchedStock: (stock) => set({ searchedStock: stock }),
  setWsConnected: (connected) => set({ wsConnected: connected }),
  setWsClient: (client) => set({ wsClient: client }),
}));

