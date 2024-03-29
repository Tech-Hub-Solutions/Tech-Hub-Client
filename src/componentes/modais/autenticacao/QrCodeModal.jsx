import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./QrCodeModal.module.css";
import ImgCellPhone from "../../../assets/images/Cellphone.png";

import React from "react";

import axiosInstance from "../../../config/axiosInstance.js";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import { useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../shared/ui/input-otp";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";


function QrCodeModal({
  user,
  isQrCodeModalOpen,
  setIsQrCodeModalOpen,
}) {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingCancelar, setIsLoadingCancelar] = React.useState(false);


  const stylesCSS = {
    dialogContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      maxWidth: "fit-content",
      borderRadius: "16px",
      overflow: "hidden",
      width: "100%",
    },
    dialogContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
      gap: "16px",
      padding: 0,
    },
    dialogTitle: {
      color: "#0f9eea",
      fontFamily: "Montserrat, sans-serif",
      textAlign: "center",
      fontSize: "32px",
      fontWeight: 600,
      padding: "0",
    },
    input: {
      "& label": {
        fontSize: "16px",
        lineHeight: "normal",
      },
      "& input": {
        padding: "12px",
        borderRadius: "8px",
      },
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  };

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
        pathname: usuario.funcao == "ADMIN" ? "/admin" : "/perfil",
      });
      return;
    } else {
      throw new Error("Erro ao realizar cadastro.");
    }
  };

  const onSubmit = () => {
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

  const cancelar = () => {
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
          redirectToPerfil(res.data);
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

  const handleClose = () => {
    setIsQrCodeModalOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={isQrCodeModalOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <div style={{ height: "100%" }}>
          <img
            style={{ height: "100%" }}
            src={ImgCellPhone}
            alt={"Pessoa com celular"}
          />
        </div>
        <div className={styles["form__container"]}>
          <DialogContent sx={stylesCSS.dialogContent}>
            <DialogTitle sx={stylesCSS.dialogTitle}>
              Habilitar autenticação de 2 fatores
            </DialogTitle>

            <img
              src={user?.secretQrCodeUrl}
              alt="QR Code"
              className={styles["qr__code"]}
            />

            <div className={styles["text__container"]}>
              <p>Baixe o autenticador da Google (Google Authenticator)</p>
              <span className={styles["text__container__code"]}>
                Impossibilitado de escanear o QR Code? Você pode usar a
                <span className={styles["text__container__code__container"]}>
                  <span>chave de configuração</span>
                  <p className={styles["code"]}>
                    {user?.secret}
                  </p>
                </span>
                para configurar manualmente o aplicativo de autenticação.
              </span>
            </div>

            <div className={styles["input__container"]}>
              <p>Verifique o código do aplicativo</p>
              <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}  >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className={styles["button__container"]}>
              <LoadingButton
                loading={isLoadingCancelar}
                onClick={() => cancelar()}
                sx={{
                  backgroundColor: "trasnparent",
                  color: "#727272",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "7px 24px",
                }}>Cancelar</LoadingButton>

              <LoadingButton
                loading={isLoading}
                sx={{
                  backgroundColor: "#0F9EEA",
                  color: "#fdfdfd",
                  fontSize: "16px",
                  fontWeight: "500",
                  '&:hover': {
                    backgroundColor: '#0F9EEA'
                  },
                  padding: "7px 24px",
                }}
                onClick={() => onSubmit()}
              >Continuar</LoadingButton>
            </div>

          </DialogContent>
        </div>

        <SnackbarCustom
          snackbarOpen={snackbarSuccessOpen.open}
          message={snackbarSuccessOpen.message}
          severity={snackbarSuccessOpen.severity}
          setSnackbarOpen={() => {
            setSnackbarSuccess((prevState) => ({
              ...prevState,
              open: false,
            }));
          }}
        ></SnackbarCustom>
      </Dialog>
    </>
  );
}

export default QrCodeModal;
