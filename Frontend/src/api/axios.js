import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// --- REQUEST INTERCEPTOR ---
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const isAuthRequest = config.url.includes("/auth/login") || config.url.includes("/auth/signup");

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    const responseData = error.response?.data;

    // Detect expiration based on your specific Backend message
    const isExpiredError =
      status === 401 ||
      (status === 500 && responseData?.error?.message === "Token expired or invalid");

    if (isExpiredError && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        console.log("🔄 Token expired. Attempting silent refresh...");

        // Call /auth/refresh using standard axios to avoid interceptor recursion
        const res = await axios.post("http://localhost:8080/auth/refresh", {
          refreshToken: refreshToken // Key must match your RefreshTokenRequestDTO
        });

        // Backend returns: { data: { jwt: "...", refresh: "..." } }
        const { jwt, refresh } = res.data.data;

        localStorage.setItem("token", jwt);
        localStorage.setItem("refreshToken", refresh);

        // Retry the original request with the new JWT
        originalRequest.headers.Authorization = `Bearer ${jwt}`;
        return axios(originalRequest);

      } catch (refreshErr) {
        console.error("❌ Refresh failed. Session expired.");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;