import axios from 'axios';

const baseURL = '/api';

const request = axios.create({
  baseURL, // 根域名配置
  timeout: 5000 // 超时时间配置
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    console.error(error, 'error');
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { request };
