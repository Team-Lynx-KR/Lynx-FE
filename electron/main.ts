/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

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
  } else {
    // 프로덕션 모드: 정확한 경로 계산
    // electron-builder로 패키징 시 파일 구조:
    // - 개발: dist-electron/main.js, dist/index.html (같은 레벨)
    // - 패키징: resources/app/dist-electron/main.js, resources/app/dist/index.html
    let htmlPath: string;
    
    // 먼저 __dirname 기준으로 시도 (개발 빌드)
    htmlPath = path.join(__dirname, '../dist/index.html');
    
    // app.getAppPath() 기준으로도 시도 (패키징된 앱)
    const appPath = app.getAppPath();
    const altPath = path.join(appPath, 'dist', 'index.html');
    
    console.log('[Electron] __dirname:', __dirname);
    console.log('[Electron] app.getAppPath():', appPath);
    console.log('[Electron] Trying path 1:', htmlPath);
    console.log('[Electron] Trying path 2:', altPath);
    
    // 파일 존재 여부 확인 후 로드
    const tryLoadFile = (filePath: string, pathName: string) => {
      if (fs.existsSync(filePath)) {
        console.log(`[Electron] ✅ File exists at ${pathName}:`, filePath);
        mainWindow?.loadFile(filePath).catch((error) => {
          console.error(`[Electron] ❌ Failed to load from ${pathName}:`, error);
          // 개발자 도구 열어서 디버깅
          mainWindow?.webContents.openDevTools();
        });
        return true;
      }
      return false;
    };
    
    // 경로 시도
    if (!tryLoadFile(htmlPath, 'path 1')) {
      if (!tryLoadFile(altPath, 'path 2')) {
        console.error('[Electron] ❌ index.html not found in any path');
        // 개발자 도구 열어서 디버깅
        mainWindow.webContents.openDevTools();
      }
    }
    
    // 임시로 개발자 도구 열기 (디버깅용 - 문제 해결 후 제거 가능)
    // mainWindow.webContents.openDevTools();
  }

  // 에러 핸들러 추가
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL) => {
    console.error('[Electron] Failed to load:', {
      errorCode,
      errorDescription,
      validatedURL,
    });
    // 프로덕션 모드에서도 개발자 도구 열어서 에러 확인
    if (!isDev) {
      mainWindow?.webContents.openDevTools();
    }
  });

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
