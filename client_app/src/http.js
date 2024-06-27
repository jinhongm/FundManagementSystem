import { ElLoading, ElMessage } from 'element-plus';
import axios from 'axios';


let loadingInstance;

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    // Trigger loading indicator before a request is made
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    // Include additional configuration settings if needed
    return config;
  },
  (error) => {
    // Handle the error
    loadingInstance.close();
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    // Close loading indicator when the response is received
    if (loadingInstance) {
      loadingInstance.close();
    }
    // Return the response data here
    return response;
  },
  (error) => {
    ElMessage.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default axios;
