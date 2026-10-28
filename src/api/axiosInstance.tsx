import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response;

},
    (error) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const code = error.response?.data?.error?.code;

            if (status == 401 && (code == "TOKEN_EXPIRED" || code == "INVALID_TOKEN")) {
                localStorage.removeItem("token");
                if (window.location.pathname !== "/login") {
                    window.location.assign("/login");
                }
            }
        }

        return Promise.reject(error);
    });

export default axiosInstance