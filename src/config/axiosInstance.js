import axios from "axios";
import adress from "./backEndAdress";


const axiosInstance = axios.create({
    baseURL: adress,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use((config) => {
    const tokenUsuario = sessionStorage.getItem('token');
    const location = window.location.pathname;

    if (tokenUsuario && location !== "/") {
        config.headers['authorization'] = `Bearer ${tokenUsuario}`;
    }

    return config;
});

export default axiosInstance;