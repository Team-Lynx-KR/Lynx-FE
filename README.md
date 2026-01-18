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


## 주요 기능

### 1. 멀티 차트 대시보드
- **3x3 그리드 레이아웃**: 9개의 종목을 동시에 모니터링
- **TradingView Lightweight Charts**: 실시간 주식 차트 표시
- **종목 검색**: 헤더에서 종목명 검색 시 해당 종목만 대시보드에 표시
- **REST API 연동**: KIS API를 통한 실시간 주가 데이터 조회

### 2. WebSocket 실시간 데이터
- **자동 연결**: 로그인 성공 시 자동으로 KIS WebSocket 연결
- **연결 상태 표시**: 헤더에 연결 상태 표시 (초록색/빨간색 점)
- **로그 패널**: 헤더의 상태 점 클릭 시 WebSocket 메시지 로그 확인 가능
- **재연결 로직**: 연결 끊김 시 자동 재연결 시도

### 3. RSS 뉴스 피드
- **실시간 뉴스**: RSS 피드를 통한 주식 관련 뉴스 수집
- **자동 업데이트**: 5분마다 뉴스 자동 갱신
  - 시간 + 카테고리 필터링: 실시간/전체 + 기술/시장/산업/정책/기업

### 4. AI 투자 비서
- **AI 예측**: 주가 변동 예측 및 매매 제안
- **보조지표 분석**: RSI, MACD, Volume, Bollinger Bands 등
- **컴팩트 패널**: 대시보드 우측에 정보 압축 표시
