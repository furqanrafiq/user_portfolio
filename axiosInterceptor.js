import axios from "axios";
import { notification } from "antd";
import { apiURL } from "./helper";

// Create Axios instance
const api = axios.create({
    baseURL: apiURL, // Set your API base URL
    headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Attach Token to Headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("easyShadiUser");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handle Expired Token (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            notification.error({
                message: "Session Expired",
                description: "Please login again.",
            });

            // Clear token and redirect to login
            localStorage.removeItem("easyShadiUser");
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;
