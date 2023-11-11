import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./CadastroModal.module.css";
import CadastroEmpresaImage from "../../../assets/images/CadastroEmpresa.svg";
import CadastroFreelancerImage from "../../../assets/images/CadastroFreelancer.svg";

import React from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";

import axiosInstance from "../../../config/axiosInstance";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import CustomLoadingButton from "../../shared/customLoadingButton/CustomLoadingButton.jsx";

function CadastroModal({
  user,
  isCadastroOpen,
  setCadastroIsOpen,
  setIsLoginModalOpen,
}) {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSenha, setShowSenha] = React.useState(false);
  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  const inpValidator = {
    campoObrigatorio: "Campo obrigatório.",
    apenasNumeros: "Apenas números.",
    minimoCaracteres: "Mínimo de 8 caracteres.",
    maximoCaracteres: "Máximo de 15 caracteres.",
    emailInvalido: "E-mail inválido.",
  };

  const snackbarMessages = {
    success: "Cadastro realizado com sucesso!",
    error: "Erro ao realizar cadastro. Tente novamente.",
  };

  const schema = yup.object().shape({
    nome: yup.string().required(inpValidator.campoObrigatorio),
    documento: yup
      .string(inpValidator.apenasNumeros)
      .required(inpValidator.campoObrigatorio),
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
      gap: "16px",
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
    customDivider: {
      width: "100%",
      color: "#666666",
      fontWeight: 600,
    },
    input: {
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

  const onSubmit = (data) => {
    if (!wasSubmitted) {
      setWasSubmitted(true);
      setIsLoading(true);

      const numeroDocumento = data.documento
        .replace(/[^0-9]/g, "")
        .replace(/[-./]/g, "");

      axiosInstance
        .post("/usuarios", {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          numeroCadastroPessoa: numeroDocumento,
          pais: null,
          funcao: user,
        })
        .then((res) => {
          setIsLoading(!isLoading);

          setSnackbarSuccess({
            open: true,
            isError: false,
            severity: "success",
            message: snackbarMessages.success,
          });

          setTimeout(() => {
            setIsLoginModalOpen(true);
            setCadastroIsOpen(false);
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
    setCadastroIsOpen(false);
  };

  const handleClickShowSenha = () => setShowSenha((show) => !show);

  const handleMouseDownSenha = (event) => {
    event.preventDefault();
  };

  const imageCadastroUser =
    user === "freelancer" ? CadastroFreelancerImage : CadastroEmpresaImage;

  const altImageCadastroUser =
    user === "freelancer"
      ? "Imagem de um homem freelancer"
      : "Imagem de homem empresário";

  const redictToLoginModal = () => {
    setCadastroIsOpen(false);
    setIsLoginModalOpen(true);
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
        open={isCadastroOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <div style={{ height: "100%" }}>
          <img
            style={{ height: "100%" }}
            src={imageCadastroUser}
            alt={altImageCadastroUser}
          />
        </div>
        <div className={styles["form__container"]}>
          <DialogTitle sx={stylesCSS.dialogTitle}>{"Cadastro"}</DialogTitle>
          <DialogContent sx={stylesCSS.dialogContent}>
            <Grid container rowSpacing={1} sx={{ marginTop: "15px" }}>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid item>
                  <TextField
                    name="nome"
                    label="Nome completo"
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{ mb: 2 }}
                    error={errors.nome?.message.length > 0}
                    helperText={errors.nome?.message}
                    fullWidth
                    placeholder="Insira seu nome completo"
                    {...register("nome")}
                  />
                </Grid>

                <Grid item>
                  <InputMask
                    mask={
                      user === "freelancer"
                        ? "999.999.999-99"
                        : "99.999.999/9999-99"
                    }
                    {...register("documento")}
                  >
                    {() => (
                      <TextField
                        name="documento"
                        label={user === "freelancer" ? "CPF" : "CNPJ"}
                        sx={{ mb: 2, ...stylesCSS.input }}
                        variant="outlined"
                        color="primary"
                        type="tel"
                        helperText={errors.documento?.message}
                        placeholder="Insira sem os pontos e traços"
                        fullWidth
                      />
                    )}
                  </InputMask>
                </Grid>

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

                <CustomLoadingButton
                  isLoading={isLoading}
                  textButton={"Cadastre-se"}
                ></CustomLoadingButton>
              </form>
            </Grid>
          </DialogContent>

          <div className={styles["possui-conta"]}>
            <p>
              Já tem conta?
              <span
                onClick={redictToLoginModal}
                className={styles["link-login"]}
              >
                Acesse aqui.
              </span>
            </p>
          </div>
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

export default CadastroModal;
