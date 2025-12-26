import { contextBridge, ipcRenderer } from 'electron';

// Electron API를 안전하게 렌더러 프로세스에 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 예시: 플랫폼 정보
  platform: process.platform,

  // 예시: 앱 버전 정보
  getVersion: () => ipcRenderer.invoke('get-version'),

  // 필요에 따라 추가 API를 여기에 정의
});

// TypeScript 타입 정의를 위한 전역 타입
declare global {
  interface Window {
    electronAPI: {
      platform: string;
      getVersion: () => Promise<string>;
    };
  }
}
