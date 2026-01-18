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
    // 프로덕션 모드: electron-builder 패키징 경로 사용
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('[Electron] Loading file from:', indexPath);
    
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('[Electron] Failed to load file:', err);
      
      // 대체 경로 시도 (electron-builder 패키징 경로)
      const altPath = path.join(process.resourcesPath || __dirname, 'app', 'dist', 'index.html');
      console.log('[Electron] Trying alternative path:', altPath);
      
      mainWindow?.loadFile(altPath).catch((altErr) => {
        console.error('[Electron] Alternative path also failed:', altErr);
        // 에러 페이지 표시
        mainWindow?.webContents.loadURL(`data:text/html,
          <html>
            <head><title>Lynx - Error</title></head>
            <body style="font-family: Arial; padding: 20px; background: #1a1a1a; color: #fff;">
              <h1>Failed to load application</h1>
              <p>Error: ${err.message}</p>
              <p>Path tried: ${indexPath}</p>
              <p>Please check if the application was built correctly.</p>
            </body>
          </html>
        `);
      });
    });
  }

  // 창이 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // 에러 발생 시 로그
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('[Electron] Failed to load:', {
      errorCode,
      errorDescription,
      validatedURL,
    });
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
