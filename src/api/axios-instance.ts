import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    if (error.code === "ECONNABORTED") {
      console.log("⏰ Timeout error");
    } else if (error.response) {
      console.log(`❌ ${error.response.status}:`, error.response.data);

      if (error.response.status === 401) {
        const originalRequest = error.config;

        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const refresh_token = Cookies.get("refresh_token");

          if (refresh_token) {
            try {
              const formData = new FormData();
              formData.append("refresh_token", refresh_token);

              const response = await axios.post(
                "http://localhost:3001/auth/token-refresh",
                formData,
              );

              if (response.data && response.data.access_token) {
                Cookies.set("access_token", response.data.access_token);
                Cookies.set("refresh_token", response.data.refresh_token);

                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                return axiosInstance(originalRequest);
              }
            } catch (refreshError) {
              console.log("Refresh failed:", refreshError);
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");
              window.location.href = "/login";
            }
          } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            window.location.href = "/login";
          }
        }
      }
    } else if (error.request) {
      console.log(
        "❌ No response from server. Check if proxy is running: node simple-proxy.mjs",
      );
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
