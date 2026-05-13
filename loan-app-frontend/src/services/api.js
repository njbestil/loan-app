import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Create an axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Retrieve the token from localStorage
const getToken = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?.token || null;
};

// Attach the token dynamically to requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response ? error.response.data : error.message)
);

// Function to get query parameters from the URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Attach functions to the api instance
api.getToken = getToken;
api.getQueryParam = getQueryParam;

export default api; 
