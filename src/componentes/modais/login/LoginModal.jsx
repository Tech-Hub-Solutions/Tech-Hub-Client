import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "../cadastro/CadastroModal.module.css";

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
import axiosInstance from "../../../config/axiosInstance";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import CustomLoadingButton from "../../shared/customLoadingButton/CustomLoadingButton";
import { useNavigate } from "react-router";

function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setTravaTelaOpen,
  setIsAutenticacaoModalOpen,
  setUser
}) {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSenha, setShowSenha] = React.useState(false);
  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  const navigate = useNavigate();

  const inpValidator = {
    campoObrigatorio: "Campo obrigatório.",
    apenasNumeros: "Apenas números.",
    minimoCaracteres: "Mínimo de 8 caracteres.",
    maximoCaracteres: "Máximo de 15 caracteres.",
    emailInvalido: "E-mail inválido.",
  };

  const snackbarMessages = {
    success: "Login realizado com sucesso!",
    error: "Erro ao realizar login. Tente novamente.",
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
      paddingBottom: "32px",
    },
    blueButton: {
      padding: "18px 125px",
      marginTop: "16px",
    },
  };

  const onSubmit = (data) => {
    if (!wasSubmitted) {
      setWasSubmitted(true);
      setIsLoading(true);

      axiosInstance
        .post("/usuarios/login", {
          email: data.email,
          senha: data.senha,
        })
        .then((res) => {

          setSnackbarSuccess({
            open: true,
            isError: false,
            severity: "success",
            message: snackbarMessages.success,
          });

          const usuario = res.data;

          setUser(usuario);

          setTimeout(() => {
            redirectToPerfil(res.data, data)
          }, 2300);
        })
        .catch((error) => {
          console.error(error);

          setSnackbarSuccess({
            open: true,
            isError: true,
            severity: "error",
            message: snackbarMessages.error,
          });
        })
        .finally(() => {
          setWasSubmitted(false);
          setIsLoading(false);
        });
    }
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

  const redirectToPerfil = (res, data) => {
    if (res.isUsing2FA) {
      setUser({ ...res.data, email: data.email, senha: data.senha });
      setIsAutenticacaoModalOpen(true);
      setIsLoginModalOpen(false);
      return;
    }

    if (usuario.token) {
      sessionStorage.setItem("usuarioId", usuario.id);
      sessionStorage.setItem("nome", usuario.nome);
      sessionStorage.setItem("token", usuario.token);
      sessionStorage.setItem("funcao", usuario.funcao);
      sessionStorage.setItem("pais", usuario.pais);
      sessionStorage.setItem("urlFotoPerfil", usuario.urlFotoPerfil);
      navigate({
        pathname: funcao == "ADMIN" ? "/admin" : "/perfil",
      });
      return;
    } else {
      throw new Error("Erro ao realizar cadastro.");
    }
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
            <Grid container rowSpacing={1}>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid item sx={{ marginTop: "15px" }}>
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

                <CustomLoadingButton
                  isLoading={isLoading}
                  textButton={"Entrar"}
                ></CustomLoadingButton>
              </form>
            </Grid>
          </DialogContent>

          <div
            className={styles["possui-conta"]}
            style={{ paddingTop: "16px" }}
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

export default LoginModal;
