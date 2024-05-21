import {
  Autocomplete,
  Box,
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
import nacionalidades from "../../shared/CountryInformation/perfil-usuario.json";
import CountryInformation from "../../shared/CountryInformation/CountryInformation";
import SwitchButton from "../../shared/SwitchButton";
import QrCodeModal from "../qrCode/QrCodeModal";
import useCodeAuthenticator from "@/src/hooks/useCodeAuthenticator";
import { LoadingButton } from "@mui/lab";

const ConfiguracaoPerfilModal = ({
  isConfiguracaoModalOpen,
  setIsConfiguracaoModalOpen,
}) => {
  const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = React.useState(false);
  const [showSenha, setShowSenha] = React.useState(false);
  const [isUsing2FA, setIsUsing2FA] = React.useState(false);
  const [usuario, setUsuario] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useState("");

  const handleClose = () => {
    setIsConfiguracaoModalOpen(false);
  };

  React.useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId");

    axiosInstance
      .get(`/usuarios/simple/${usuarioId}`)
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isConfiguracaoModalOpen]);

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
    success: "Dados atualizados com sucesso!",
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

  const funcaoUsuario = localStorage.getItem("funcao");

  const { redirectToPerfil } = useCodeAuthenticator();

  const onSubmit = (data) => {
    setIsLoading(true);

    axiosInstance
      .put("/usuarios", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        pais: nacionalidades.find((pais) => pais.nome === data.nacionalidade)?.sigla,
        isUsing2FA: isUsing2FA,
      })
      .then((res) => {
        setSnackbarSuccess({
          open: true,
          isError: false,
          severity: "success",
          message: snackbarMessages.success,
        });
        
        setUser(({ ...res.data, email: data.email, senha: data.senha }));


        setTimeout(() => {
          setIsConfiguracaoModalOpen(false);
          if (isUsing2FA && !usuario.isUsing2FA) {
            setIsQrCodeModalOpen(true);
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
          message: snackbarMessages.error,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickShowSenha = () => setShowSenha((show) => !show);
  const handleMouseDownSenha = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (!usuario) {
      return;
    }
    setValue("nome", usuario.nome);
    setValue("email", usuario.email);
    const nacionalidade = nacionalidades.find(
      (pais) => pais.sigla === usuario.pais
    )?.nome;

    setValue("nacionalidade", nacionalidade);
    setIsUsing2FA(usuario.isUsing2FA);
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
                      marginBottom: "18px",
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
                      marginBottom: "18px",
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
                  {

                    usuario?.pais &&
                    < Autocomplete
                      options={nacionalidades}
                      autoHighlight
                      getOptionLabel={(option) => option.nome}
                      isOptionEqualToValue={(option, value) => option.sigla === value.sigla}
                      defaultValue={nacionalidades.find(pais => pais.sigla === usuario.pais)}
                      sx={{
                        marginBottom: "18px",
                        minWidth: "590px",
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="nacionalidade"
                          {...register("nacionalidade")}
                          error={errors.nacionalidade?.message.length > 0}
                          helperText={errors.nacionalidade?.message}
                          {...params}
                          label="Selecione um país"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <CountryInformation pais={option.sigla} />
                        </Box>
                      )}
                    />
                  }

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
                      marginBottom: "18px",
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


                <Grid item sx={{
                  marginBottom: "18px",
                  minWidth: "590px",
                  marginTop: "6px",
                }}>
                  <div className={styles["switch__container"]}>
                    <SwitchButton checked={isUsing2FA} onChange={() => setIsUsing2FA(!isUsing2FA)} />
                    <p>Ativar autenticação de dois fatores</p>
                  </div>
                </Grid>

                <div className={styles["container__button"]}>
                  <ButtonExplorarTalentos
                    onClick={() =>
                      setIsConfiguracaoModalOpen(!isConfiguracaoModalOpen)
                    }
                  >
                    Cancelar
                  </ButtonExplorarTalentos>

                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      textTransform: "none",
                      fontStyle: "normal",
                      fontSize: "16px",
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      backgroundColor: "#0F9EEA",
                      color: "#fdfdfd",
                      lineHeight: "1.3",
                      '&:hover': {
                        backgroundColor: "#0F9EEA",
                      }
                    }}

                    style={{ width: "180px", height: "47.2px" }}
                  >
                    Salvar
                  </LoadingButton>
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
      <QrCodeModal
        isQrCodeModalOpen={isQrCodeModalOpen}
        setIsQrCodeModalOpen={setIsQrCodeModalOpen}
        user={user}
      />
    </>
  );
};

export default ConfiguracaoPerfilModal;
