import axios from "axios";
const axiosClient = axios.create({
  baseURL:
    "https://9ec7-2405-4802-9115-60d0-75cb-fe75-52cd-9616.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
//   interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
