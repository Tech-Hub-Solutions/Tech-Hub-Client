import {
    Autocomplete,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Button,
    Chip
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import axiosInstance from "../../../config/axiosInstance";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom";

import styles from "./modalPerfil.module.css";
import React from 'react';
import { verificarCorflag } from "../../../utils/geral";


const ModalPerfil = ({ usuario, isModalEdicaoOpen, setModalEdicaoOpen, carregarPerfil }) => {

    const handleClose = () => {
        setModalEdicaoOpen(false);
    };

    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
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


    const snackbarMessages = {
        success: "Dados atualizados com sucesso!",
        error: "Erro ao realizar atualização de dados. Tente novamente.",
        maximoSkills: "Máximo de 10 skills.",
        link: "Insira um link válido."
    };

    const schema = yup.object().shape({
        softSkills: yup
            .array()
            .transform((value, originalValue) => {
                // original value é o valor que vem do input
                // value é o valor que o yup usa para fazer as validações
                if (originalValue === "") {
                    return [];
                }
                return value;
            })
            .max(10, snackbarMessages.maximoSkills),

        hardSkills: yup
            .array()
            .transform((value, originalValue) => {
                if (originalValue === "") {
                    return [];
                }
                return value;
            })
            .max(10, snackbarMessages.maximoSkills),
        linkLinkedin: yup.string()
            .notRequired()
            .test('contemPalavraExample', snackbarMessages.link,
                value => !value || value.includes('https://www.linkedin.com/in/') || value.includes('https://linkedin.com/in/')),
        linkGithub: yup.string()
            .notRequired()
            .test('contemPalavraExample', snackbarMessages.link,
                value => !value || value.includes('https://github.com/')),
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

    const onSubmit = (data) => {
        if (!wasSubmitted) {
            setWasSubmitted(true);
            setIsLoading(true);

            const flagsId = [];

            for (let i = 0; i < data.softSkills.length; i++) {
                flagsId.push(data.softSkills[i].id);
            }

            for (let i = 0; i < data.hardSkills.length; i++) {
                flagsId.push(data.hardSkills[i].id);
            }

            axiosInstance
                .put("/perfis", {
                    sobreMim: data.sobreMim,
                    experiencia: data.experiencia,
                    descricao: data.descricao,
                    precoMedio: data.precoMedio,
                    nomeGithub: data.nomeGithub,
                    linkGithub: data.linkGithub,
                    linkLinkedin: data.linkLinkedin,
                    flagsId: flagsId,
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
                        setModalEdicaoOpen(false);

                        carregarPerfil()
                    }, 1000);
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

    React.useEffect(() => {
        if (!usuario) {
            return;
        }

        carregarFlags();

    }, [isModalEdicaoOpen]);

    const carregarFlags = async () => {
        await axiosInstance.get('/flags')
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


                    setValue("descricao", usuario?.descricao);
                    setValue("experiencia", usuario?.experiencia);
                    setValue("sobreMim", usuario?.sobreMim);
                    setValue("precoMedio", usuario?.precoMedio);
                    setValue("nomeGithub", usuario?.nomeGithub)
                    setValue("linkGithub", usuario?.linkGithub);
                    setValue("linkLinkedin", usuario?.linkLinkedin);
                    setValue("softSkills", usuario?.softSkills);
                    setValue("hardSkills", usuario?.hardSkills);
                }
            })
    }

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
                                    label="Link Linkedin"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "552px",
                                        marginTop: "6px",
                                    }}
                                    defaultValue={""}
                                    placeholder="https://www.linkedin.com/in/usuario"
                                    {...register("linkLinkedin")}
                                    error={errors.linkLinkedin?.message.length > 0}
                                    helperText={errors.linkLinkedin?.message}
                                />
                            </Grid>
                            <Grid item className={styles['contatos']}>
                                <GitHubIcon style={{ color: "var(--color-cinza)", fontSize: "40px", marginTop: "45px" }}></GitHubIcon>
                                <TextField
                                    name="github"
                                    label="Link GitHub"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "552px",
                                        marginTop: "38px",

                                    }}
                                    defaultValue={""}
                                    placeholder="https://www.github.com/usuario"
                                    {...register("linkGithub")}
                                    error={errors.linkGithub?.message.length > 0}
                                    helperText={errors.linkGithub?.message}
                                />
                            </Grid>
                            <Grid item className={styles['contatos']}>
                                <GitHubIcon style={{ color: "var(--color-cinza)", fontSize: "40px", marginTop: "75px" }}></GitHubIcon>
                                <TextField
                                    name="nomeGithub"
                                    label="Nome de usuario GitHub"
                                    variant="outlined"
                                    color="primary"
                                    type="text"
                                    sx={{
                                        marginBottom: "32px",
                                        minWidth: "552px",
                                        marginTop: "70px",
                                    }}
                                    defaultValue={""}
                                    placeholder="usuario"
                                    {...register("nomeGithub")}
                                />
                            </Grid>
                            <Grid item sx={{
                                marginTop: "100px",
                                padding: "0 40px",
                            }}>
                                <Autocomplete
                                    {...register("softSkills")}
                                    multiple
                                    id="tags-outlined"
                                    options={softSkills}
                                    getOptionLabel={(option) => option.nome}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    filterSelectedOptions
                                    defaultValue={usuario?.softSkills}
                                    onChange={(e, values) => {
                                        setValue("softSkills", values);
                                    }}
                                    renderInput={(params) => (
                                        <TextField sx={{ width: 600 }}
                                            {...params}
                                            label={funcaoUsuario === "EMPRESA" ? "Valores da empresa (máximo 10)" :
                                            "Soft Skills (máximo 10)"}
                                            placeholder="Profissionalismo..."
                                            error={errors.softSkills?.message.length > 0}
                                            helperText={errors.softSkills?.message}
                                        />
                                    )}

                                    renderOption={(props, option) => (
                                        <li {...props} style={{
                                            ...props.style,
                                            backgroundColor: "#F5F5F5",
                                            color: "#000",
                                            // cinza mais escuro: #E5E5E5
                                            // mais que o de cima: #F5F5F5
                                            border: "1px solid #ffff"
                                        }}>
                                            {option.nome}
                                        </li>
                                    )}

                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                variant="outlined"
                                                {...getTagProps({ index })}
                                                label={option.nome}
                                                style={{
                                                    ...getTagProps({ index }).style,
                                                    backgroundColor: verificarCorflag(option),
                                                    color: "#000",
                                                    border: "none"
                                                }}
                                            />
                                        ))
                                    }

                                />
                            </Grid>
                            {funcaoUsuario === "FREELANCER" &&
                                <>
                                    <Grid item sx={{
                                        marginTop: "32px",
                                        padding: "0 40px",
                                    }}>
                                        <Autocomplete
                                            {...register("hardSkills")}
                                            multiple
                                            id="tags-outlined-2"
                                            options={hardSkills}
                                            getOptionLabel={(option) => option.nome}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            defaultValue={usuario?.hardSkills}
                                            onChange={(e, values) => {
                                                setValue("hardSkills", values);
                                            }}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField sx={{ width: 600 }}
                                                    {...params}
                                                    label="Hard Skills (máximo 10)"
                                                    placeholder="Angular..."
                                                    error={errors.hardSkills?.message.length > 0}
                                                    helperText={errors.hardSkills?.message}
                                                />
                                            )}
                                            // adicionar regrar de cor na hardSkill
                                            renderOption={(props, option) => (
                                                <li {...props} style={{
                                                    ...props.style,
                                                    backgroundColor: "#F5F5F5",
                                                    color: "#000",
                                                    // cinza mais escuro: #E5E5E5
                                                    // mais que o de cima: #F5F5F5
                                                    border: "1px solid #ffff"
                                                }}>
                                                    {option.nome}
                                                </li>
                                            )}

                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        {...getTagProps({ index })}
                                                        label={option.nome}
                                                        style={{
                                                            ...getTagProps({ index }).style,
                                                            backgroundColor: verificarCorflag(option),
                                                            color: "#000",
                                                            border: "none"
                                                        }}
                                                    />
                                                ))
                                            }


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
    );
};

export default ModalPerfil;
