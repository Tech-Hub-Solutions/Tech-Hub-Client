import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVICES_BASE_URL}`,
    timeout: 15000,
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

    if (!tokenUsuario && location !== "/") {
        window.location.href = "/";
        sessionStorage.clear();
    }

    return config;
});

axiosInstance.interceptors.response.use((response) => response,
    (error) => {
        const location = window.location.pathname;
        if (error.request.status == 401 && location !== "/") {
            window.location.href = "/";
            sessionStorage.clear();
        }
        if (error.code === 'ECONNABORTED') {
            window.location.href = "/error/500/Erro de conexão com o servidor";
        }
        if (error.response.status === 500) {
            window.location.href = "/error/500/Erro interno do servidor";
        }
        if (error.response.status === 403) {
            window.location.href = "/error/403/Acesso negado";
        }
        return Promise.reject(error);
    });

export default axiosInstance;