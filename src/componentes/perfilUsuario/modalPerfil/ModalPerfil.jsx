import {
    Autocomplete,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    createFilterOptions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { Button } from "@mui/base";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import nacionalidades from "../../shared/CountryInformation/perfil-usuario.json";
import teste from "../../shared/CountryInformation/teste.json";
import CountryInformation from "../../shared/CountryInformation/CountryInformation";
import axiosInstance from "../../../config/axiosInstance";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom";
import { Label, Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./modalPerfil.module.css";
import React from 'react';
import CustomizedHook from "../../shared/customizedHook/CustomizedHook";

const ModalPerfil = ({ isModalEdicaoOpen, setModalEdicaoOpen }) => {

    const handleClose = () => {
        setModalEdicaoOpen(false);
    };

    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
    const [usuario, setUsuario] = React.useState({});
    const [softSkills, setSoftSkills] = React.useState([]);
    const [hardSkills, setHardSkills] = React.useState([]);


    React.useState("");

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
        maximoCaracteres: "Máximo de 200 caracteres.",
        emailInvalido: "E-mail inválido.",
    };

    const snackbarMessages = {
        success: "Dados atualizados com sucesso! Entre novamente para continuar.",
        error: "Erro ao realizar atualização de dados. Tente novamente.",
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const funcaoUsuario = sessionStorage.getItem("funcao");

    const navigate = useNavigate();

    const onSubmit = (data) => {
        alert(JSON.stringify(data, null, 2));
        // if (!wasSubmitted) {
        //     setWasSubmitted(true);
        //     setIsLoading(true);

        //     axiosInstance
        //         .put("/usuarios", {
        //             nome: data.nome,
        //             email: data.email,
        //             senha: data.senha,
        //             pais: nacionalidades.find((pais) => pais.nome === data.nacionalidade)?.sigla,
        //         })
        //         .then((res) => {
        //             setIsLoading(!isLoading);

        //             setSnackbarSuccess({
        //                 open: true,
        //                 isError: false,
        //                 severity: "success",
        //                 message: snackbarMessages.success,
        //             });

        //             setTimeout(() => {
        //                 isModalEdicaoOpen(false);

        //                 sessionStorage.clear();

        //                 navigate("/");
        //             }, 2300);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //             setSnackbarSuccess({
        //                 open: true,
        //                 isError: true,
        //                 severity: "error",
        //                 message: snackbarMessages.error,
        //             });
        //         })
        //         .finally(() => {
        //             setWasSubmitted(false);
        //             setIsLoading(false);
        //         });
        // }
    };

    React.useEffect(() => {
        if (!usuario) {
            return;
        }

        const usuarioId = sessionStorage.getItem("usuarioId");

        axiosInstance.get('/perfis/' + usuarioId)
            .then((response) => {
                if (response.status == 200) {
                    setUsuario(response.data)
                }
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    setIsNotFound(true);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

        axiosInstance.get('/flags')
            .then((response) => {
                if (response.status == 200) {

                    const flags = response.data;

                    let softSkills = [];
                    let hardSkills = [];

                    for (let i = 0; i < flags.length; i++) {
                        if (flags[i].categoria === "soft-skill") {
                            softSkills.push(flags[i]);
                        } else if (flags[i].categoria === "hard-skill") {
                            hardSkills.push(flags[i]);
                        }
                    }

                    setSoftSkills(softSkills);
                    setHardSkills(hardSkills);

                }
            })

        setValue("descricao", usuario.descricao);
        setValue("experiencia", usuario.experiencia);
        setValue("sobreMim", usuario.sobreMim);
        setValue("precoMedio", usuario.precoMedio);
        setValue("linkGithub", usuario.linkGithub);
        setValue("linkLinkedin", usuario.linkLinkedin);

    }, [isModalEdicaoOpen]);

    return (
        <Dialog
            open={isModalEdicaoOpen}
            onClose={handleClose}
            PaperProps={{
                sx: stylesCSS.dialogContainer,
            }}>
            <div className={styles["form__container"]}>
                <DialogTitle sx={stylesCSS.dialogTitle}>
                    {"Editar Perfil"}
                </DialogTitle>

                <DialogContent sx={stylesCSS.dialogContent}>
                    <Grid container rowSpacing={1} sx={stylesCSS.gridContainer}>
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                            className={styles["form__control"]}
                        >
                            <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px",
                            }}>
                                <TextField
                                    name="descricao"
                                    label="Descrição"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    inputProps={{ maxLength: 70 }}
                                    sx={{
                                        minWidth: "600px",
                                        marginTop: "6px",
                                        marginBottom: "16px",
                                    }}
                                    defaultValue={""}
                                    // error={errors.nome?.message.length > 0}
                                    // helperText={errors.nome?.message}
                                    placeholder={funcaoUsuario === "EMPRESA" ? "Empresa de tecnologia" :
                                        "Desenvolvedor Full-Stack | Angular | React | Node.js"}
                                    {...register("descricao")}
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px",
                            }}>
                                <TextField
                                    name="experiencia"
                                    label={funcaoUsuario === "EMPRESA" ? "Sobre nós" :
                                        "Experiência"}
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    inputProps={{ maxLength: 200 }}
                                    multiline
                                    rows={4}
                                    sx={{
                                        minWidth: "600px",
                                        marginTop: "6px",
                                        marginBottom: "16px",
                                    }}
                                    defaultValue={""}
                                    // error={errors.nome?.message.length > 0}
                                    // helperText={errors.nome?.message}
                                    placeholder={funcaoUsuario === "EMPRESA" ? "Empresa de tecnologia consolidada no mercado..." :
                                        "Na minha jornada, liderei projetos desafiadores..."}
                                    {...register("experiencia")}
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px",
                            }}>
                                <TextField
                                    name="sobreMim"
                                    label={funcaoUsuario === "EMPRESA" ? "Quem procuramos" :
                                        "Sobre mim"}
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    inputProps={{ maxLength: 200 }}
                                    multiline
                                    rows={4}
                                    sx={{
                                        minWidth: "600px",
                                        marginTop: "6px",
                                        marginBottom: "16px",
                                    }}
                                    defaultValue={""}
                                    // error={errors.nome?.message.length > 0}
                                    // helperText={errors.nome?.message}
                                    placeholder={funcaoUsuario === "EMPRESA" ? "Procuramos pessoas que..." :
                                        "Sou um entusiasta da tecnologia dedicado..."}
                                    {...register("sobreMim")}
                                />
                            </Grid>
                            {funcaoUsuario === "FREELANCER" &&
                                <Grid item sx={{
                                    marginTop: "24px",
                                    padding: "0 40px",
                                }}>
                                    <TextField
                                        name="preco"
                                        label="Seu preço"
                                        variant="outlined"
                                        color="primary"
                                        type="number"
                                        sx={{
                                            minWidth: "600px",
                                            marginTop: "6px",
                                            marginBottom: "16px",
                                        }}
                                        defaultValue={""}
                                        // error={errors.nome?.message.length > 0}
                                        // helperText={errors.nome?.message}
                                        placeholder="R$ 0.00"
                                        {...register("precoMedio")}
                                    />
                                </Grid>
                            }
                            <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px",
                            }}>
                                <h1 style={{ color: "var(--color-cinza)", fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Formas de contato</h1>
                            </Grid>
                            <Grid item className={styles['contatos']}>
                                <LinkedInIcon style={{ color: "#0076B2", fontSize: "40px", marginTop: "15px" }}></LinkedInIcon>
                                <TextField
                                    name="linkedin"
                                    label="Linkedin"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "552px",
                                        marginTop: "6px",
                                    }}
                                    defaultValue={""}
                                    // error={errors.nome?.message.length > 0}
                                    // helperText={errors.nome?.message}
                                    placeholder="https://www.linkedin.com/in/usuario"
                                    {...register("linkLinkedin")}
                                />
                            </Grid>
                            <Grid item className={styles['contatos']}>
                                <GitHubIcon style={{ color: "var(--color-cinza)", fontSize: "40px", marginTop: "15px" }}></GitHubIcon>
                                <TextField
                                    name="github"
                                    label="GitHub"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "552px",
                                        marginTop: "6px",

                                    }}
                                    defaultValue={""}
                                    // error={errors.nome?.message.length > 0}
                                    // helperText={errors.nome?.message}
                                    placeholder="https://www.github.com/usuario"
                                    {...register("linkGithub")}
                                />
                            </Grid>
                            {/* <Grid item sx={{
                                marginTop: "24px",
                                padding: "0 40px",
                                height: "8%"
                            }}>
                                <Autocomplete
                                    id="controllable-states-demo"
                                    options={softSkills}
                                    autoHighlight
                                    getOptionLabel={(option) => option.nome}
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "590px",
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            name="softSkills"
                                            sx={{
                                                marginBottom: "32px",
                                                minWidth: "600px",
                                                marginTop: "6px",
                                            }}
                                            {...params}
                                            label={funcaoUsuario === "EMPRESA" ? "Valores" :
                                                "Soft Skill"}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: "new-password", // disable autocomplete and autofill

                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <Box
                                            component="li"
                                            {...props}
                                        >
                                            {
                                                <p>{option.nome}</p>
                                            }
                                        </Box>
                                    )}
                                />
                            </Grid> */}
                            <Grid item sx={{
                                marginTop: "32px",
                                padding: "0 40px",
                            }}>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={softSkills}
                                    getOptionLabel={(option) => option.nome}
                                    defaultValue={[]}
                                    filterSelectedOptions
                                    {...register("softSkills")}
                                    renderInput={(params) => (
                                        <TextField sx={{ width: 600 }}
                                            {...params}
                                            label="Soft Skills"
                                            placeholder="Profissionalismo..."
                                        />
                                    )}
                                />
                            </Grid>
                            {funcaoUsuario === "FREELANCER" &&
                                <>
                                    <Grid item sx={{
                                        marginTop: "24px",
                                        padding: "0 40px",
                                        height: "8%"
                                    }}>
                                        <Autocomplete
                                            id="controllable-states-demo"
                                            options={hardSkills}
                                            autoHighlight
                                            getOptionLabel={(option) => option.nome}
                                            sx={{
                                                marginBottom: "32px",
                                                minWidth: "590px",
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    name="hardSkills"
                                                    sx={{
                                                        marginBottom: "32px",
                                                        minWidth: "600px",
                                                        marginTop: "6px",
                                                    }}
                                                    // error={errors.nacionalidade?.message.length > 0}
                                                    // helperText={errors.nacionalidade?.message}
                                                    {...params}
                                                    label="Hard Skill"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: "new-password", // disable autocomplete and autofill

                                                    }}
                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <Box
                                                    component="li"
                                                    {...props}
                                                >
                                                    {
                                                        <p>{option.nome}</p>
                                                    }
                                                </Box>
                                            )}
                                        />
                                    </Grid>
                                </>
                            }


                            <div className={styles["container__button"]}>
                                <ButtonExplorarTalentos
                                    onClick={() =>
                                        setModalEdicaoOpen(!isModalEdicaoOpen)
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

            </div >
        </Dialog >
    );
};

export default ModalPerfil;
