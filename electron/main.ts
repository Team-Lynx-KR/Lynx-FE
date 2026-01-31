/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import path from 'path';

// 개발 모드인지 확인
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// 디버깅: 현재 모드 확인
console.log('[Electron] NODE_ENV:', process.env.NODE_ENV);
console.log('[Electron] app.isPackaged:', app.isPackaged);
console.log('[Electron] isDev:', isDev);

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
      webSecurity: true, // HTTPS 사용 시 true
    },
  });

  // 개발 모드에서는 Vite 개발 서버, 프로덕션에서는 Vercel 배포 URL
  // app.isPackaged를 명시적으로 확인
  if (!app.isPackaged && process.env.NODE_ENV !== 'production') {
    console.log('[Electron] 🛠️ Development mode: Loading fromh lynx-fe.vercel.app/');
    mainWindow.loadURL('https://lynx-fe.vercel.app/');
    mainWindow.webContents.openDevTools();
    mainWindow.show(); // 개발 모드에서는 즉시 표시
  } else {
    // 프로덕션 모드: Vercel 배포 URL 사용
    const deployUrl = 'https://lynx-fe.vercel.app/';

    console.log('[Electron] 🚀 Production mode: Loading from deploy URL:', deployUrl);

    // 개발자 도구 열기 (디버깅용)
    mainWindow.webContents.openDevTools();

    // 로드 완료 이벤트
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('[Electron] ✅ Page finished loading');
      mainWindow?.show();
    });

    // 에러 핸들러 추가
    mainWindow.webContents.on(
      'did-fail-load',
      (_event, errorCode, errorDescription, validatedURL) => {
        console.error('[Electron] Failed to load resource:', {
          errorCode,
          errorDescription,
          validatedURL,
        });
        // 폴백: 로컬 파일 사용
        const appPath = app.getAppPath();
        const htmlPath = path.join(appPath, 'dist', 'index.html');
        console.log('[Electron] Trying fallback to local file:', htmlPath);
        mainWindow
          ?.loadFile(htmlPath)
          .then(() => {
            console.log('[Electron] ✅ Successfully loaded from local file');
            mainWindow?.show();
          })
          .catch((fallbackError) => {
            console.error('[Electron] ❌ Failed to load from local file:', fallbackError);
            mainWindow?.show();
          });
      }
    );

    // 페이지 로드 시작
    mainWindow.loadURL(deployUrl).catch((error) => {
      console.error('[Electron] ❌ Failed to load from deploy URL:', error);
      // 폴백: 로컬 파일 사용
      const appPath = app.getAppPath();
      const htmlPath = path.join(appPath, 'dist', 'index.html');
      console.log('[Electron] Trying fallback to local file:', htmlPath);
      mainWindow
        ?.loadFile(htmlPath)
        .then(() => {
          console.log('[Electron] ✅ Successfully loaded from local file');
          mainWindow?.show();
        })
        .catch((fallbackError) => {
          console.error('[Electron] ❌ Failed to load from local file:', fallbackError);
          mainWindow?.show();
        });
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
