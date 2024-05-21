import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

const useCodeAuthenticator = () => {

  const navigate = useNavigate();


  const redirectToPerfil = (usuario) => {
    if (usuario.token) {
      sessionStorage.setItem("usuarioId", usuario.id);
      sessionStorage.setItem("nome", usuario.nome);
      sessionStorage.setItem("token", usuario.token);
      sessionStorage.setItem("funcao", usuario.funcao);
      sessionStorage.setItem("pais", usuario.pais);
      sessionStorage.setItem("urlFotoPerfil", usuario.urlFotoPerfil);
      navigate({
        pathname: usuario.funcao == "ADMIN" ? "/admin" : `/perfil/${usuario.id}`,
      });
      return;
    }
  };

  const authenticate = (code, user, setSnackbarSuccess, setIsLoading, setIsQrCodeModalOpen) => {
    if (!code || code.length < 6) {
      setSnackbarSuccess({
        open: true,
        isError: true,
        severity: "error",
        message: "Código inválido.",
      });
      return;
    }

    setIsLoading(true);

    axiosInstance
      .post("/usuarios/verify", {
        email: user.email,
        senha: user.senha,
        code: code,
      })
      .then((res) => {
        setSnackbarSuccess({
          open: true,
          isError: false,
          severity: "success",
          message: "Código verificado com sucesso."
        });

        setTimeout(() => {
          if (setIsQrCodeModalOpen)
            setIsQrCodeModalOpen(false)
          redirectToPerfil(res.data);

        }, 2300);
      })
      .catch((error) => {
        console.error(error);
        setSnackbarSuccess({
          open: true,
          isError: true,
          severity: "error",
          message: "Código inválido.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cancelar = (user, setSnackbarSuccess, setIsLoadingCancelar, setIsQrCodeModalOpen) => {
    setIsLoadingCancelar(true);

    axiosInstance
      .post("/usuarios/login", {
        email: user.email,
        senha: user.senha,
      })
      .then((res) => {
        setSnackbarSuccess({
          open: true,
          isError: false,
          severity: "success",
          message: "Redirecionando..."
        });

        setTimeout(() => {
          if (setIsQrCodeModalOpen) {
            setIsQrCodeModalOpen(false)
          } else {
            redirectToPerfil(res.data);
          }
        }, 2300);
      })
      .catch((error) => {
        console.error(error);
        setSnackbarSuccess({
          open: true,
          isError: true,
          severity: "error",
          message: "Houve um erro ao cancelar a autenticação de 2 fatores.",
        });
      })
      .finally(() => {
        setIsLoadingCancelar(false);
      });
  };

  return { authenticate, cancelar, redirectToPerfil }
}

export default useCodeAuthenticator;