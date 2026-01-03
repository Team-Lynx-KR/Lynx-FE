import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from './auth';

// API 클라이언트 설정
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL;
  const defaultURL = 'http://52.79.164.160:3000';
  const baseURL = envURL || defaultURL;
  // console.log('[API Client] BaseURL 설정:', { envURL, defaultURL, final: baseURL });
  return baseURL;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 있다면 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 토큰 갱신 시도
        console.log('[autologin] 토큰 만료 감지, 자동 갱신 시도...');
        const tokenResponse = await refreshToken(storedRefreshToken);

        // 새 토큰 저장
        localStorage.setItem('token', tokenResponse.accessToken);
        localStorage.setItem('refreshToken', tokenResponse.refreshToken);
        console.log('[autologin] ✅ 토큰 갱신 성공, 요청 재시도');

        // 원래 요청에 새 토큰 추가하여 재시도
        originalRequest.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error('[autologin] ❌ 토큰 갱신 실패, 로그아웃 처리');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuthenticated');
        window.dispatchEvent(new Event('authStateChanged'));
        
        // 로그인 페이지로 리다이렉트 (브라우저 환경인 경우)
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    // 401이 아니거나 재시도한 요청인 경우 원래 에러 반환
    return Promise.reject(error);
  }
);

export default apiClient;
