import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import styles from "../cadastro/CadastroModal.module.css";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import Divider from "@mui/material/Divider";

import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import imageLogin from "../../../assets/images/LoginModal.svg";
import GoogleVetor from "../../../assets/images/GoogleVetor.svg";
import axiosInstance from "../../../config/axiosInstance";

function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setTravaTelaOpen,
}) {
  const inpValidator = {
    campoObrigatorio: "Campo obrigatório.",
    apenasNumeros: "Apenas números.",
    minimoCaracteres: "Mínimo de 8 caracteres.",
    maximoCaracteres: "Máximo de 15 caracteres.",
    emailInvalido: "E-mail inválido.",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(inpValidator.emailInvalido)
      .required(inpValidator.campoObrigatorio),
    senha: yup
      .string()
      .min(8, inpValidator.minimoCaracteres)
      .max(15, inpValidator.maximoCaracteres)
      .required(inpValidator.campoObrigatorio),
  });

  const stylesCSS = {
    dialogContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      maxWidth: "fit-content",
      borderRadius: "16px",
      overflow: "hidden",
      height: "100%",
      width: "100%",
    },
    dialogContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
      padding: 0,
    },
    dialogTitle: {
      color: "#0f9eea",
      fontFamily: "Montserrat, sans-serif",
      textAlign: "center",
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      paddingBottom: "24px",
    },
    buttonGoogle: {
      border: "1px solid #333",
      color: "#333",
      gap: "15px",
      padding: "18px 36px",
      borderRadius: "6px",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      textTransform: "none",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "1.3",
    },
    customDivider: {
      width: "100%",
      color: "#666666",
      fontWeight: 600,
      padding: "24px 0 30px 0",
    },
    blueButton: {
      padding: "18px 125px",
      marginTop: "16px",
    },
  };

  const [showSenha, setShowSenha] = React.useState(false);

  const onSubmit = (data) => {
    console.log(data);

    axiosInstance
      .post("/login", {
        email: data.email,
        senha: data.senha,
      })
      .then((res) => {
        console.info(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleClickShowSenha = () => setShowSenha((show) => !show);

  const handleMouseDownSenha = (event) => {
    event.preventDefault();
  };

  const redirectToTravaTelaCadastro = () => {
    setIsLoginModalOpen(false);
    setTravaTelaOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Dialog
        fullWidth
        open={isLoginModalOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <div className={styles["form__container"]}>
          <DialogTitle sx={stylesCSS.dialogTitle}>{"Login"}</DialogTitle>
          <DialogContent sx={stylesCSS.dialogContent}>
            <Button variant="outlined" sx={stylesCSS.buttonGoogle}>
              <img
                style={{ width: "23px" }}
                src={GoogleVetor}
                alt="Logo da Google"
              />
              Continuar com Google
            </Button>

            <Divider sx={stylesCSS.customDivider}>OU</Divider>

            <Grid container rowSpacing={1}>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid item>
                  <TextField
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    color="primary"
                    type="email"
                    sx={{ mb: 2 }}
                    error={errors.email?.message.length > 0}
                    helperText={errors.email?.message}
                    fullWidth
                    placeholder="email@email.com"
                    {...register("email")}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    name="senha"
                    label="Senha"
                    variant="outlined"
                    color="primary"
                    type={showSenha ? "text" : "password"}
                    error={errors.senha?.message.length > 0}
                    helperText={errors.senha?.message}
                    sx={{ mb: 2 }}
                    fullWidth
                    placeholder="Mínimo 8 caracteres"
                    {...register("senha")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle senha visibility"
                            onClick={handleClickShowSenha}
                            onMouseDown={handleMouseDownSenha}
                          >
                            {showSenha ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <BlueBackgroundButton
                  // TODO - Add função para realizar login
                  onClick={() => {
                    console.log("fez login");
                  }}
                  style={stylesCSS.blueButton}
                  type="submit"
                >
                  Entrar
                </BlueBackgroundButton>
              </form>
            </Grid>
          </DialogContent>

          <div
            className={styles["possui-conta"]}
            style={{ paddingTop: "32px" }}
          >
            <p>
              Não tem conta?
              <span
                onClick={redirectToTravaTelaCadastro}
                className={styles["link-login"]}
              >
                Cadastre-se.
              </span>
            </p>
          </div>
        </div>

        <div style={{ height: "100%" }}>
          <img
            style={{ height: "100%" }}
            src={imageLogin}
            alt="Homem tomando café e usando notebook"
          />
        </div>
      </Dialog>
    </>
  );
}

export default LoginModal;
