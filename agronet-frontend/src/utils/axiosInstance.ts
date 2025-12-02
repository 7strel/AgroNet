import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

// Add a request interceptor to attach the access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to refresh token if needed
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No refresh token available");

                const refreshResponse = await axios.post(`${baseURL}/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = refreshResponse.data.access;
                localStorage.setItem("access_token", newAccessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login"; // Redirect to login
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
