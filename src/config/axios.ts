import axios from "axios";
const baseURL = "https://dice-draft-service.onrender.com/api/v1";
export const axiosInstance = axios.create({
  baseURL: `${baseURL}/admin`,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("dd-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("you are not authorized, logging out...");
    }
    return Promise.reject(error);
  }
);
