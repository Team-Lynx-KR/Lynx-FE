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

/**
 * 회원가입 API 호출
 * @param data 회원가입 정보 (이메일, 비밀번호, 닉네임)
 * @returns 회원가입 성공 응답
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  // 가능한 엔드포인트 경로들을 시도
  const endpoints = [
    '/api/auth/register',  // baseURL이 http://52.79.164.160:3000인 경우
    '/auth/register',       // baseURL이 http://52.79.164.160:3000/api인 경우
  ];

  let lastError: any = null;

  for (const endpoint of endpoints) {
    try {
      console.log('[Register API] 시도 중:', {
        endpoint,
        baseURL: apiClient.defaults.baseURL,
        fullURL: `${apiClient.defaults.baseURL}${endpoint}`,
        data: { ...data, password: '***' },
      });

      const response = await apiClient.post<RegisterResponse>(endpoint, data);
      console.log('[Register API] 성공 응답:', response.data);
      return response.data;
    } catch (error: any) {
      lastError = error;
      console.warn('[Register API] 실패:', {
        endpoint,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });

      // 404가 아닌 다른 에러면 즉시 중단 (예: 400, 409 등은 경로는 맞지만 데이터 문제)
      if (error.response?.status && error.response.status !== 404) {
        console.error('[Register API] 404가 아닌 에러 발생, 중단:', {
          status: error.response.status,
          data: error.response.data,
        });
        throw error;
      }
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
