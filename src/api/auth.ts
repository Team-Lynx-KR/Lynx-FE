/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from './client';

// 회원가입 요청 타입
export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

// 회원가입 응답 타입
export interface RegisterResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
  };
}

/**
 * 회원가입 API 호출
 * @param data 회원가입 정보 (이메일, 비밀번호, 닉네임)
 * @returns 회원가입 성공 응답
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  // 가능한 엔드포인트 경로들을 시도
  const endpoints = ['/auth/register'];

  let lastError: any = null;

  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post<RegisterResponse>(endpoint, data);
      // 성공 시에만 로그 출력
      console.log('[Register API] ✅ 회원가입 성공!');
      return response.data;
    } catch (error: any) {
      lastError = error;

      // 404가 아닌 다른 에러면 즉시 중단 (예: 400, 409 등은 경로는 맞지만 데이터 문제)
      if (error.response?.status && error.response.status !== 404) {
        console.error('[Register API] ❌ 회원가입 실패:', {
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
        throw error;
      }
      // 404 에러는 조용히 처리 (경로 탐색 과정이므로)
    }
  }

  // 모든 경로가 실패한 경우
  console.error('[Register API] 모든 경로 시도 실패:', {
    endpoints,
    lastError: {
      message: lastError?.message,
      status: lastError?.response?.status,
      statusText: lastError?.response?.statusText,
      data: lastError?.response?.data,
      url: lastError?.config?.url,
      baseURL: lastError?.config?.baseURL,
      fullURL: `${lastError?.config?.baseURL}${lastError?.config?.url}`,
    },
  });
  throw lastError;
};

/**
 * 로그인 API 호출
 * @param data 로그인 정보 (이메일, 비밀번호)
 * @returns 로그인 성공 응답 (액세스 토큰, 리프레시 토큰)
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // 가능한 엔드포인트 경로들을 시도
  const endpoints = ['/auth/login'];

  let lastError: any = null;

  for (const endpoint of endpoints) {
    try {
      const response = await apiClient.post<LoginResponse>(endpoint, data);
      // 성공 시에만 로그 출력
      console.log('[Login API] ✅ 로그인 성공!', {
        user: response.data.user?.email || data.email,
      });
      return response.data;
    } catch (error: any) {
      lastError = error;

      // 404가 아닌 다른 에러면 즉시 중단 (예: 400, 401 등은 경로는 맞지만 데이터 문제)
      if (error.response?.status && error.response.status !== 404) {
        console.error('[Login API] ❌ 로그인 실패:', {
          status: error.response.status,
          message: error.response.data?.message || error.message,
        });
        throw error;
      }

      // 404 에러는 조용히 처리 (경로 탐색 과정이므로)
      // 마지막 시도가 아니면 다음 경로로 계속 진행
    }
  }

  // 모든 경로가 실패한 경우
  console.error('[Login API] 모든 경로 시도 실패:', {
    endpoints,
    lastError: {
      message: lastError?.message,
      status: lastError?.response?.status,
      statusText: lastError?.response?.statusText,
      data: lastError?.response?.data,
      url: lastError?.config?.url,
      baseURL: lastError?.config?.baseURL,
      fullURL: `${lastError?.config?.baseURL}${lastError?.config?.url}`,
    },
  });
  throw lastError;
};
