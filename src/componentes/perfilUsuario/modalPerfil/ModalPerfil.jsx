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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { Button } from "@mui/base";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import { useNavigate } from "react-router-dom";

import nacionalidades from "../../shared/CountryInformation/perfil-usuario.json";
import CountryInformation from "../../shared/CountryInformation/CountryInformation";
import axiosInstance from "../../../config/axiosInstance";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./modalPerfil.module.css";
import React from 'react';

const ModalPerfil = ({ isModalEdicaoOpen, setModalEdicaoOpen }) => {

    const handleClose = () => {
        setModalEdicaoOpen(false);
    };

    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [showSenha, setShowSenha] = React.useState(false);
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
    const [usuario, setUsuario] = React.useState({});

    const [valuePais, setValuePais] = React.useState();

    React.useState("");

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
            alignItems: "flex-start",
            flexDirection: "row",
            maxWidth: "fit-content",
            borderRadius: "16px",
            overflow: "hidden",
            width: "100%",
            height: "680px"
        },
        dialogTitle: {
            color: "var(--color-azul)",
            fontFamily: "Montserrat, sans-serif",
            textAlign: "center",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            paddingBottom: "32px",
            marginTop: "62px",
            marginBottom: "40px",
            padding: "0 "
        },
        dialogContent: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 0,
        },
        gridContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
    };

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
                    pais: nacionalidades.find((pais) => pais.nome === data.nacionalidade)?.sigla,
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
                        isModalEdicaoOpen(false);

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
        if (!usuario) {
            return;
        }
        setValue("nome", usuario.nome);
        setValue("email", usuario.email);
        const nacionalidade = nacionalidades.find(
            (pais) => pais.sigla === usuario.pais
        )?.nome;

        setValue("nacionalidade", nacionalidade);
    }, [usuario, isModalEdicaoOpen]);

    return (
        <Dialog
            open={isModalEdicaoOpen}
            onClose={handleClose}
            PaperProps={{
                sx: stylesCSS.dialogContainer,
            }}>
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
                            <Grid item sx={{
                                marginTop: "16px",
                                padding: "0 40px",
                                height: "15%",
                            }}>
                                <TextField
                                    name="nome"
                                    label="Nome"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "600px",
                                        marginTop: "6px",
                                    }}
                                    defaultValue={""}
                                    error={errors.nome?.message.length > 0}
                                    helperText={errors.nome?.message}
                                    placeholder="Insira seu nome completo"
                                    {...register("nome")}
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px"
                            }}>
                                <TextField
                                    name="email"
                                    label="Descrição"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "600px",
                                        marginTop: "6px",
                                    }}
                                    defaultValue={""}
                                    error={errors.nome?.message.length > 0}
                                    helperText={errors.nome?.message}
                                    placeholder="Insira sua descrição"
                                    {...register("email")}
                                />
                            </Grid>
                        </form>
                    </Grid>
                </DialogContent>

            </div>
        </Dialog>
    );
};

export default ModalPerfil;
