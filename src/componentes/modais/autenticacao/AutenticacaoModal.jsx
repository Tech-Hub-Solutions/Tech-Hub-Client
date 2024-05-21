import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import styles from "../cadastro/CadastroModal.module.css";

import imageLogin from "../../../assets/images/LoginModal.svg";
import imageCadeado from "../../../assets/images/cadeado.svg";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../shared/ui/input-otp";
import useCodeAuthenticator from "@/src/hooks/useCodeAuthenticator";
import { LoadingButton } from "@mui/lab";
import useDebounce from "@/src/hooks/useDebounce";

function AutenticacaoModal({
  isAutenticacaoModalOpen,
  setIsAutenticacaoModalOpen,
  user
}) {

  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingCancelar, setIsLoadingCancelar] = React.useState(false);
  const [code, setCode] = React.useState("");

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
      padding: 0,
      gap: "3rem",
    },
    dialogTitle: {
      color: "#0f9eea",
      fontFamily: "Montserrat, sans-serif",
      textAlign: "center",
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      paddingBottom: "32px",
    },
    blueButton: {
      padding: "18px 125px",
      marginTop: "16px",
    },
  };

  const { authenticate } = useCodeAuthenticator();

  const handleClose = () => {
    setIsAutenticacaoModalOpen(!isAutenticacaoModalOpen);
  };

  const debouncedCode = useDebounce(code, 600);
  useEffect(() => {
    if (debouncedCode.length === 6) {
      setIsLoading(true);
      authenticate(debouncedCode, user, setSnackbarSuccess, setIsLoading)
    };
  }, [debouncedCode]);


  return (
    <>
      <Dialog
        fullWidth
        open={isAutenticacaoModalOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <div className={styles["form__container"]}>

          <DialogContent sx={stylesCSS.dialogContent}>
            <div className={styles["input__container__autentication"]}>
              <img src={imageCadeado} alt="Cadeado" className={styles["image__lock"]} />
              <p>Insira o código de autenticação</p>
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

            <hr className={styles["line"]} />

            <div className={styles["button__container"]}>
              <LoadingButton
                loading={isLoadingCancelar}
                onClick={() => setIsAutenticacaoModalOpen(false)}
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
                onClick={() => authenticate(code, user, setSnackbarSuccess, setIsLoading)}
              >Continuar</LoadingButton>
            </div>

          </DialogContent>

        </div >

        <div style={{ height: "100%" }}>
          <img
            style={{ height: "100%" }}
            src={imageLogin}
            alt="Homem tomando café e usando notebook"
          />
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
      </Dialog >
    </>
  );
}

export default AutenticacaoModal;
