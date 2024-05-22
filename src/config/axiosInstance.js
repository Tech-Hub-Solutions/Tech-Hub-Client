import axios from "axios";
import { getCurrentUser } from "../utils/localStoreManager";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVICES_BASE_URL}`,
    timeout: 25000,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use((config) => {
    const tokenUsuario = getCurrentUser()?.token;
    const location = window.location.pathname;

    if (tokenUsuario && location !== "/") {
        config.headers['authorization'] = `Bearer ${tokenUsuario}`;
    }

    if (!tokenUsuario && location !== "/") {
        sessionStorage.NEXT_URL = location;
        window.location.href = "/";
        localStorage.clear();
    }

    return config;
});


export default axiosInstance;