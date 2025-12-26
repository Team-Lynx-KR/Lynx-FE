# Lynx-FE

AI 비서와 함께 매매하는 데스크톱 HTS 애플리케이션

## 기술 스택

- **프레임워크**: Electron + React + TypeScript + Vite
- **상태관리**: Zustand
- **스타일링**: Tailwind CSS
- **차트**: Lightweight Charts (TradingView)
- **HTTP 클라이언트**: Axios
- **WebSocket**: 네이티브 WebSocket API

## 프로젝트 구조

```
lynx-fe/
├── electron/          # Electron 메인 프로세스
│   ├── main.ts       # 메인 프로세스 엔트리
│   └── preload.ts    # 프리로드 스크립트
├── src/
│   ├── api/          # API 클라이언트
│   ├── components/   # React 컴포넌트
│   │   ├── ai/       # AI 비서 관련 컴포넌트
│   │   ├── chart/    # 차트 관련 컴포넌트
│   │   └── layout/   # 레이아웃 컴포넌트
│   ├── hooks/        # 커스텀 훅
│   ├── pages/        # 페이지 컴포넌트
│   ├── store/        # Zustand 스토어
│   ├── types/        # TypeScript 타입 정의
│   ├── utils/        # 유틸리티 함수
│   ├── App.tsx       # 메인 앱 컴포넌트
│   └── main.tsx      # React 엔트리
├── dist/             # 빌드 출력 (렌더러)
├── dist-electron/    # 빌드 출력 (메인 프로세스)
└── release/          # 패키징된 앱

```

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 개발 모드 실행

```bash
#  Vite 개발 서버 시작 (포트 5173)
npm run electron:dev
```

### 빌드

```bash
# 렌더러 프로세스 빌드
npm run build:renderer

# Electron 메인 프로세스 빌드
npm run build:electron

# 전체 빌드 및 패키징
npm run build
```

## 주요 기능

### 1. 멀티 차트 대시보드 (좌측)
- TradingView Lightweight Charts를 사용한 실시간 차트
- 커스텀 대시보드 구성

### 2. AI 투자 비서 (우측)
- 뉴스 데이터 분석
- 보조지표 기반 매매 전략 제안
- 실시간 분석 결과 표시