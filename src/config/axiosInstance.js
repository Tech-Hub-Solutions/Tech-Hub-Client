import axios from "axios";

const ipBackEnd = {
    localhost: "localhost",
}

const axiosInstance = axios.create({
    baseURL: `http://${ipBackEnd.localhost}:8080`,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const tokenUsuario = sessionStorage.getItem('token');

    if (tokenUsuario) {
        config.headers['authorization'] = `Bearer ${tokenUsuario}`;
    }

    return config;
});

export default axiosInstance;