import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./ConfiguracaoPerfil.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { Button } from "@mui/base";
import axiosInstance from "../../../config/axiosInstance";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import { useNavigate } from "react-router-dom";

const ConfiguracaoPerfilModal = ({
  isConfiguracaoModalOpen,
  setIsConfiguracaoModalOpen,
}) => {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSenha, setShowSenha] = React.useState(false);
  const [wasSubmitted, setWasSubmitted] = React.useState(false);
  const [usuario, setUsuario] = React.useState({});

  const handleClose = () => {
    setIsConfiguracaoModalOpen(false);
  };

  React.useEffect(() => {
    const usuarioId = sessionStorage.getItem("usuarioId");
    console.log("usuarioId", usuarioId);

    axiosInstance
      .get(`/usuarios/simple/${usuarioId}`)
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      fontSize: "32px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      paddingBottom: "32px",
      marginTop: "62px",
      marginBottom: "40px",
    },
    gridContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "0 44px",
    },
  };

  const ButtonExplorarTalentos = styled(Button)({
    fontFamily: "Montserrat, sans-serif",
    padding: "10px 16px",
    width: 180,
    borderRadius: "6px",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: "transparent",
    color: "#0f9eea",
    border: "2px solid #0F9EEA",
  });

  const inpValidator = {
    campoObrigatorio: "Campo obrigatório.",
    minimoCaracteres: "Mínimo de 8 caracteres.",
    maximoCaracteres: "Máximo de 15 caracteres.",
    emailInvalido: "E-mail inválido.",
  };

  const snackbarMessages = {
    success: "Dados atualizados com sucesso! Entre novamente para continuar.",
    error: "Erro ao realizar atualização de dados. Tente novamente.",
  };

  const schema = yup.object().shape({
    nome: yup.string().required(inpValidator.campoObrigatorio),
    email: yup
      .string()
      .email(inpValidator.emailInvalido)
      .required(inpValidator.campoObrigatorio),
    nacionalidade: yup.string().required(inpValidator.campoObrigatorio),
    senha: yup
      .string()
      .min(8, inpValidator.minimoCaracteres)
      .max(15, inpValidator.maximoCaracteres)
      .required(inpValidator.campoObrigatorio),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const funcaoUsuario = sessionStorage.getItem("funcao");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!wasSubmitted) {
      setWasSubmitted(true);
      setIsLoading(true);

      axiosInstance
        .put("/usuarios", {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          pais: data.nacionalidade,
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
            setIsConfiguracaoModalOpen(false);

            sessionStorage.clear();

            navigate("/");
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

  const handleClickShowSenha = () => setShowSenha((show) => !show);
  const handleMouseDownSenha = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setValue("nome", usuario.nome);
    setValue("email", usuario.email);
    setValue("nacionalidade", usuario.pais);
  }, [usuario]);

  return (
    <>
      <Dialog
        fullWidth
        open={isConfiguracaoModalOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <div className={styles["form__container"]}>
          <DialogTitle sx={stylesCSS.dialogTitle}>
            {"Editar configurações"}
          </DialogTitle>

          <DialogContent sx={stylesCSS.dialogContent}>
            <Grid container rowSpacing={1} sx={stylesCSS.gridContainer}>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={styles["form__control"]}
              >
                <Grid item>
                  {/* TODO FIX - Add possibilidade de editar value em cada TextField */}
                  <TextField
                    name="nome"
                    label={
                      funcaoUsuario === "FREELANCER"
                        ? "Nome completo"
                        : "Nome da empresa"
                    }
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
                    defaultValue={"."}
                    error={errors.nome?.message.length > 0}
                    helperText={errors.nome?.message}
                    placeholder="Insira seu nome completo"
                    {...register("nome")}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    color="primary"
                    type="email"
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
                    defaultValue={"."}
                    error={errors.email?.message.length > 0}
                    helperText={errors.email?.message}
                    fullWidth
                    placeholder="email@email.com"
                    {...register("email")}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    name="nacionalidade"
                    label="Nacionalidade"
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
                    defaultValue={"."}
                    error={errors.nacionalidade?.message.length > 0}
                    helperText={errors.nacionalidade?.message}
                    fullWidth
                    placeholder="Sua nacionalidade"
                    {...register("nacionalidade")}
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
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
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

                <div className={styles["container__button"]}>
                  <ButtonExplorarTalentos
                    onClick={() =>
                      setIsConfiguracaoModalOpen(!isConfiguracaoModalOpen)
                    }
                  >
                    Cancelar
                  </ButtonExplorarTalentos>

                  <BlueBackgroundButton
                    type="submit"
                    style={{ width: "180px", height: "47.2px" }}
                  >
                    Salvar
                  </BlueBackgroundButton>
                </div>
              </form>
            </Grid>
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
};

export default ConfiguracaoPerfilModal;
