import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token when access token expires
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://localhost:8080/api/auth/refresh-token",
          {
            refreshToken,
          }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;