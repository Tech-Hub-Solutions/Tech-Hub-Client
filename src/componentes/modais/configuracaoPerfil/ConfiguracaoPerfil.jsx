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
import CustomLoadingButton from "../../shared/customLoadingButton/CustomLoadingButton";
import styled from "@emotion/styled";
import { Button } from "@mui/base";
import axiosInstance from "../../../config/axiosInstance";

const ConfiguracaoPerfilModal = ({
  usuario,
  isConfiguracaoModalOpen,
  setIsConfiguracaoModalOpen,
}) => {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSenha, setShowSenha] = React.useState(false);
  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  console.log("PROOOOOOPPPSSSS => ", usuario);

  const handleClose = () => {
    setIsConfiguracaoModalOpen(false);
  };

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
    apenasNumeros: "Apenas números.",
    minimoCaracteres: "Mínimo de 8 caracteres.",
    maximoCaracteres: "Máximo de 15 caracteres.",
    emailInvalido: "E-mail inválido.",
  };

  const snackbarMessages = {
    success: "Dados atualizados com sucesso!",
    error: "Erro ao realizar atualização de dados. Tente novamente.",
  };

  const schema = yup.object().shape({
    nome: yup.string().required(inpValidator.campoObrigatorio),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const handleClickShowSenha = () => setShowSenha((show) => !show);
  const handleMouseDownSenha = (event) => {
    event.preventDefault();
  };

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
                {/* TODO - Atualizar o onSubmit p/ PUT de infos usuário */}
                <Grid item>
                  <TextField
                    name="nome"
                    // TODO - Add lógica p/ label = "Nome completo" se user === "FREELANCER" ? "Nome completo" : "Nome da empresa"
                    // TODO - Add value p/ começar de acordo com o que vem na requisição
                    label="Nome completo"
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
                    // TODO - Não estou conseguindo editar as input
                    value={usuario.usuario.nome}
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
                    // TODO - Não estou conseguindo editar as input
                    value={usuario.usuario.email}
                    sx={{
                      marginBottom: "32px",
                      minWidth: "590px",
                      marginTop: "6px",
                    }}
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

                  {/* TODO - Alterar tamanho do botão */}
                  <CustomLoadingButton
                    isLoading={isLoading}
                    textButton={"Salvar"}
                  ></CustomLoadingButton>
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
