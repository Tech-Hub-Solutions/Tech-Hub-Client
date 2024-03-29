import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "../cadastro/CadastroModal.module.css";
import ImgCellPhone from "../../../assets/images/Cellphone.png";

import React, { useEffect } from "react";

import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../shared/ui/input-otp";
import { LoadingButton } from "@mui/lab";
import useCodeAuthenticator from "@/src/hooks/useCodeAuthenticator";
import useDebounce from "@/src/hooks/useDebounce";


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

  const { authenticate, cancelar } = useCodeAuthenticator()
  const debouncedCode = useDebounce(code, 600);
  useEffect(() => {
    if (debouncedCode.length === 6) {
      setIsLoading(true);
      authenticate(debouncedCode, user, setSnackbarSuccess, setIsLoading, setIsQrCodeModalOpen);
    };
  }, [debouncedCode]);

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
                onClick={() => cancelar(user, setSnackbarSuccess, setIsLoadingCancelar, setIsQrCodeModalOpen)}
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
                onClick={() => authenticate(code, user, setSnackbarSuccess, setIsLoading, setIsQrCodeModalOpen)}
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
