/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import path from 'path';

// 개발 모드인지 확인
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow: Electron.BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    frame: true,
    titleBarStyle: 'default',
    show: false, // 먼저 숨기고 준비되면 표시
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  // 개발 모드에서는 Vite 개발 서버, 프로덕션에서는 빌드된 파일
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
    mainWindow.show(); // 개발 모드에서는 즉시 표시
  } else {
    // 프로덕션 모드: file:// 프로토콜 사용하여 상대 경로 리소스 정상 로드
    const appPath = app.getAppPath();
    const htmlPath = path.join(appPath, 'dist', 'index.html');
    
    // Windows 경로를 file:// URL 형식으로 변환
    const fileUrl = process.platform === 'win32'
      ? `file:///${htmlPath.replace(/\\/g, '/')}`
      : `file://${htmlPath}`;
    
    console.log('[Electron] Loading HTML from:', htmlPath);
    console.log('[Electron] File URL:', fileUrl);
    
    mainWindow.loadURL(fileUrl)
      .then(() => {
        console.log('[Electron] ✅ Successfully loaded HTML');
        mainWindow?.show();
      })
      .catch((error) => {
        console.error('[Electron] ❌ Failed to load HTML:', error);
        // 개발자 도구 열어서 디버깅
        mainWindow?.webContents.openDevTools();
        mainWindow?.show();
      });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 보안: 새 창 생성 방지
app.on('web-contents-created', (_: any, contents: any) => {
  contents.on('new-window', (navigationEvent: any) => {
    navigationEvent.preventDefault();
  });
});
