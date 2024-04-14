import React from "react";
import axiosInstance from "../config/axiosInstance";

const useAxiosConfig = () => {
    const [snackbarErrorOpen, setSnackbarError] = React.useState({});

    React.useEffect(() => {
        axiosInstance.interceptors.response.use((response) => response,
            (error) => {
                const location = window.location.pathname;

                if (error.request.status == 401 && location !== "/" && !error.request.responseURL.includes("usuarios/verify")) {
                    window.location.href = "/";
                    sessionStorage.clear();
                }

                if (error.request.status == 404) {
                    setSnackbarError({
                        open: true,
                        message: "Erro 404: Recurso não encontrado",
                        severity: "error",
                    });
                }

                if (error?.code === "ECONNABORTED") {
                    setSnackbarError({
                        open: true,
                        message: "Tempo de requisição excedido",
                        severity: "error",
                    });
                }

                if (error.request.status === 500) {
                    setSnackbarError({
                        open: true,
                        message: "Erro 500: Interno do servidor",
                        severity: "error",
                    });
                }

                if (error.request.status === 403) {
                    window.location.href = "/error/403/Acesso negado";
                }
                return Promise.reject(error);
            });
    }, []);

    return { snackbarErrorOpen }
}

export default useAxiosConfig;