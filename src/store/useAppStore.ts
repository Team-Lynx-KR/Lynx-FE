import { create } from 'zustand';

interface AppState {
  // 예시 상태
  isConnected: boolean;
  selectedSymbol: string | null;
  
  // 액션
  setConnected: (connected: boolean) => void;
  setSelectedSymbol: (symbol: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isConnected: false,
  selectedSymbol: null,
  
  setConnected: (connected) => set({ isConnected: connected }),
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
}));

