import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // Change to your backend URL
});

// Interceptor to add JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle Refresh Token if JWT expires (401 error)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // Calling your /auth/refresh endpoint
        const res = await axios.post("http://localhost:8080/auth/refresh", {
          refresh: refreshToken
        });

        const newJwt = res.data.data.jwt;
        localStorage.setItem("token", newJwt);
        originalRequest.headers.Authorization = `Bearer ${newJwt}`;
        return API(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default API;