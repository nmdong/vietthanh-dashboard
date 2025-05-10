import Axios from "axios";
import { API_SERVER } from "../config/constant";

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        const accessToken = userObj?.token?.access;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (err) {
        console.error("Failed to parse user token from localStorage", err);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  // Cấu hình interceptor nếu cần (không dùng hook ở đây)
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh"); // hoặc chỗ nào bạn lưu token
      if (!refreshToken) {
        window.location.href = "/authentication/sign-in";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post("/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axios(originalRequest);
      } catch (err) {
        window.location.href = "/authentication/sign-in";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
