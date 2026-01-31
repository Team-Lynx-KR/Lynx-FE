/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from './client';

// KIS REST API 인증 토큰 요청
export interface KISAuthTokenRequest {
  // 필요한 파라미터 추가
}

export interface KISAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// KIS WebSocket 접속키 요청
export interface KISWebSocketAuthRequest {
  // 필요한 파라미터 추가
}

export interface KISWebSocketAuthResponse {
  approval_key: string;
  [key: string]: any;
}

// 종목 검색 요청
export interface StockSearchRequest {
  keyword: string;
  market?: string;
}

export interface StockSearchResponse {
  message?: string;
  stock: {
    code: string;
    name: string;
    marketType?: string;
    [key: string]: any;
  };
  prices?: Array<{
    id: string;
    code: string;
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    [key: string]: any;
  }>;
  // 이전 형식과의 호환성을 위한 선택적 필드
  stocks?: Array<{
    code: string;
    name: string;
    market: string;
    [key: string]: any;
  }>;
}

// 종목 마스터 데이터 개수 조회 응답
export interface StockMasterCountResponse {
  count: number;
}

// 대시보드 상위 종목 조회 응답
export interface DashboardStockResponse {
  message: string;
  stocks: Array<{
    code: string;
    name: string;
    tradingAmount: number;
    dailyPrices: Array<{
      id: number;
      code: string;
      date: string;
      open: number;
      close: number;
      high: number;
      low: number;
      volume: string;
      macd?: number;
      macdSignal?: number;
      macdHistogram?: number;
      elderBullPower?: number;
      elderBearPower?: number;
      disparity5?: number;
      disparity20?: number;
      disparity60?: number;
      rsi?: number;
      ma5?: number;
      ma20?: number;
      ma60?: number;
      bbUpper?: number;
      bbMiddle?: number;
      bbLower?: number;
      bbWidth?: number;
      [key: string]: any;
    }>;
  }>;
}

/**
 * KIS REST API 인증 토큰 발급
 */
export const getKISAuthToken = async (): Promise<KISAuthTokenResponse> => {
  try {
    const response = await apiClient.post<KISAuthTokenResponse>('/stock/kis/restapi/auth/token', {
      appKey: import.meta.env.VITE_KIS_APP_KEY,
      appSecretKey: import.meta.env.VITE_KIS_APP_SECRET,
    });
    console.log('[Stock API] ✅ KIS 인증 토큰 발급 성공');
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ KIS 인증 토큰 발급 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * KIS WebSocket 접속키 발급
 */
export const getKISWebSocketAuth = async (): Promise<KISWebSocketAuthResponse> => {
  try {
    const response = await apiClient.post<KISWebSocketAuthResponse>(
      '/stock/kis/websocket/auth/approval',
      {
        appKey: import.meta.env.VITE_KIS_APP_KEY,
        appSecretKey: import.meta.env.VITE_KIS_APP_SECRET,
      }
    );
    console.log('[Stock API] ✅ KIS WebSocket 접속키 발급 성공');
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ KIS WebSocket 접속키 발급 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    });
    throw error;
  }
};

/**
 * 종목 검색
 */
export const searchStock = async (data: StockSearchRequest): Promise<StockSearchResponse> => {
  try {
    const response = await apiClient.post<StockSearchResponse>('/stock/search', data);
    console.log('[Stock API] ✅ 종목 검색 성공:', { keyword: data.keyword });
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ 종목 검색 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 종목 마스터 데이터 수동 동기화 (관리자용)
 */
export const syncStockMaster = async (): Promise<void> => {
  try {
    await apiClient.post('/stock/master/sync');
    console.log('[Stock API] ✅ 종목 마스터 데이터 동기화 성공');
  } catch (error: any) {
    console.error('[Stock API] ❌ 종목 마스터 데이터 동기화 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 종목 마스터 데이터 개수 조회 (관리자용)
 */
export const getStockMasterCount = async (): Promise<StockMasterCountResponse> => {
  try {
    const response = await apiClient.get<StockMasterCountResponse>('/stock/master/count');
    console.log('[Stock API] ✅ 종목 마스터 데이터 개수 조회 성공');
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ 종목 마스터 데이터 개수 조회 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 일봉 데이터 수동 수집 (증분 업데이트) (관리자용)
 */
export const collectStockPrice = async (): Promise<void> => {
  try {
    await apiClient.post('/stock/price/collect');
    console.log('[Stock API] ✅ 일봉 데이터 수집 성공');
  } catch (error: any) {
    console.error('[Stock API] ❌ 일봉 데이터 수집 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 일봉 데이터 전체 수동 수집 (관리자용)
 */
export const collectStockPriceFull = async (): Promise<void> => {
  try {
    await apiClient.post('/stock/price/collect-full');
    console.log('[Stock API] ✅ 일봉 데이터 전체 수집 성공');
  } catch (error: any) {
    console.error('[Stock API] ❌ 일봉 데이터 전체 수집 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 등락률 데이터 계산 (관리자용)
 */
export const transformStockFeature = async (): Promise<void> => {
  try {
    await apiClient.post('/stock/feature/transform');
    console.log('[Stock API] ✅ 등락률 데이터 계산 성공');
  } catch (error: any) {
    console.error('[Stock API] ❌ 등락률 데이터 계산 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

/**
 * 대시보드 상위 종목 조회 (최근 일주일 거래대금 기준 TOP 9)
 */
export const getDashboardStocks = async (): Promise<DashboardStockResponse> => {
  try {
    const response = await apiClient.get<DashboardStockResponse>('/stock/dashboard');
    console.log('[Stock API] ✅ 대시보드 상위 종목 조회 성공');
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ 대시보드 상위 종목 조회 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// 종목별 뉴스 조회 요청
export interface StockNewsRequest {
  keyword: string;
}

// 종목별 뉴스 조회 응답
export interface StockNewsResponse {
  message: string;
  stock: {
    code: string;
    name: string;
  };
  news: Array<{
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: string;
  }>;
}

/**
 * 종목별 뉴스 조회 (최신순 5개)
 */
export const getStockNews = async (data: StockNewsRequest): Promise<StockNewsResponse> => {
  try {
    const response = await apiClient.post<StockNewsResponse>('/stock/news', data);
    console.log('[Stock API] ✅ 종목별 뉴스 조회 성공:', { keyword: data.keyword });
    return response.data;
  } catch (error: any) {
    console.error('[Stock API] ❌ 종목별 뉴스 조회 실패:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
