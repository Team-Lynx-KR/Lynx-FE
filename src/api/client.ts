import axios from 'axios';

// API 클라이언트 설정
// Swagger 주소: http://52.79.164.160:3000/api
// 환경 변수 확인 및 디버깅
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL;
  const defaultURL = 'http://52.79.164.160:3000';
  const baseURL = envURL || defaultURL;
  console.log('[API Client] BaseURL 설정:', { envURL, defaultURL, final: baseURL });
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
    // 디버깅: 실제 요청 URL 로그
    console.log('[API Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직
    if (error.response?.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
