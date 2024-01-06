import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // API의 기본 URL 설정
  // 여기에 추가적인 기본 설정을 추가할 수 있습니다.
});

// 요청 시 인터셉터 설정
axiosInstance.interceptors.request.use(
  config => {
    // access token이 로컬 스토리지에 있으면 해당 토큰을 헤더에 디폴트로 셋팅 한다.
    // 해당 토큰을 검증할지 말지는 백엔드에서 결정한다.
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 시 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    // 리스폰스 헤더에서 accessToken을 확인
    // refresh token을 통해 신규 access token이 발급된 경우 해당 토큰을 사용 한다. 
    const accessToken = response.headers['accesstoken'];

    if (accessToken) {
      // accessToken이 존재하면 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
    }

    // 리스폰스 헤더에서 accessToken을 확인
    const refreshToken = response.headers['refreshtoken'];

    if (refreshToken) {
      // accessToken이 존재하면 로컬 스토리지에 저장
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      // 401에러가 발생 -> access token 인증이 실패된 경우. + 아직 인증 실패에 의한 재 시도를 하지 않은 경우
      originalRequest._retry = true;
      // 리프레쉬 키를 가져 온다.
      const refreshToken = localStorage.getItem('refreshToken');

      // 여기에 refreshToken을 사용하여 새로운 accessToken을 요청하는 로직을 추가
      if(refreshToken) {
        try {
          // 리프레쉬로 access key 재인증을 요구 한다.
          const response = await axiosInstance.post('/auth/refresh', { refreshToken });
          const accessToken = response.headers['accesstoken'];

          if (accessToken) {
            // 새로 받아온 access key가 있다면, 해당 키를 이용해 요청이 재 시도 되는 것을 기대 한다.
            localStorage.setItem('accessToken', accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;  
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 여기에 새로운 토큰을 받는 데 실패했을 경우의 처리 로직을 추가
          return Promise.reject(refreshError);
        }
      }      
    }
    return Promise.reject(error);
  }
);

async function fetchData(url, params = {}) {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postData(url, data) {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function putData(url, data) {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function modifyData(url, data) {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
