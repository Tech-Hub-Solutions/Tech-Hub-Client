import React from "react";
import axiosInstance from "../config/axiosInstance";

const useAxiosConfig = () => {
    const [snackbarErrorOpen, setSnackbarErrorOpen] = React.useState({});

    React.useEffect(() => {
        axiosInstance.interceptors.response.use((response) => response,
            (error) => {
                const location = window.location.pathname;

                if (error.request?.status == 401 && location !== "/" && !error.request.responseURL.includes("usuarios/verify")) {
                    sessionStorage.NEXT_URL = location;
                    localStorage.clear();
                    window.location.href = "/";
                }

                if (error.request?.status == 404 && !response.request.responseURL.includes("/metricas-usuario")) {
                    setSnackbarErrorOpen({
                        open: true,
                        message: "Erro 404: Recurso não encontrado",
                        severity: "error",
                    });
                }

                if (error?.code === "ECONNABORTED") {
                    setSnackbarErrorOpen({
                        open: true,
                        message: "Tempo de requisição excedido",
                        severity: "error",
                    });
                }

                if (error.request?.status === 500) {
                    setSnackbarErrorOpen({
                        open: true,
                        message: "Erro 500: Interno do servidor",
                        severity: "error",
                    });
                }

                if (error.request?.status === 403) {
                    window.location.href = "/error/403/Acesso negado";
                }
                return Promise.reject(error);
            });
    }, []);

    return { snackbarErrorOpen, setSnackbarErrorOpen };
}

export default useAxiosConfig;
