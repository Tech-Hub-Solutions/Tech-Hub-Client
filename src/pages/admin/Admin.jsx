import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./admin.module.css";
import FlagsList from "../../componentes/Admin/FlagsList";
import * as yup from "yup";
import { Autocomplete, Box, Button, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../componentes/shared/header/Header";
import NotFound from "../notFound/NotFound";
import UndoIcon from '@mui/icons-material/Undo';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SnackbarCustom from "../../componentes/shared/snackbar/SnackbarCustom";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const Admin = () => {
    const [areas, setAreas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});
    const [showLimparRefazer, setShowLimparRefazer] = useState(false);
    const [showLimparAgendados, setShowLimparAgendados] = useState(false);

    const inpValidator = {
        campoObrigatorio: "Campo obrigatório."
    };

    const schema = yup.object().shape({
        nome: yup.string().required(inpValidator.campoObrigatorio),
        area: yup.string().required(inpValidator.campoObrigatorio),
    });


    const styleMui = {
        input: {
            width: "20rem",
        },
        buttonForm: {
            width: "100%",
            height: "47.2px",
            fontWeight: "bold",
        },
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });



    React.useEffect(() => {
        const admin = sessionStorage.getItem("funcao") == "ADMIN";
        setIsAdmin(admin);

        if (!admin) return;

        carregarFlags();
    }, []);


    const carregarFlags = () => {
        axiosInstance.get(`/flags`)
            .then(response => {
                if (response.status == 200) {
                    const flags = response.data;
                    const areasRequest = [];

                    flags.forEach((flag) => {

                        let area = areasRequest.find(area => area.nome == flag.area);

                        if (!area) {
                            areasRequest.push({ nome: flag.area, tecnologias: [] });
                            area = areasRequest.find(area => area.nome == flag.area);
                        }

                        const tecnologia = area?.tecnologias.find(tecnologia => tecnologia.id == flag.id);

                        if (!tecnologia) {
                            area?.tecnologias.push({
                                id: flag.id,
                                nome: flag.nome
                            });
                        }
                    });


                    setAreas(() => {
                        areasRequest.sort((a, b) => {
                            if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
                                return -1;
                            } else {
                                return 1;
                            }
                        });

                        return areasRequest;
                    });

                }
            })
    }

    const onSubmit = (data) => {
        const url = buttonClicked == "salvar" ? "flags" : "flags/agenda-adicionar";

        axiosInstance.post(url, {
            nome: data.nome,
            area: data.area,
            categoria: data.area == "Soft-skills" ? "soft-skill" : "hard-skill"
        })
            .then(response => {
                setSnackbarSuccess({
                    open: true,
                    message: buttonClicked == "salvar" ? "Flag cadastrada com sucesso." : "Flag agendada com sucesso.",
                    severity: "success",
                });

                carregarFlags();
            })
            .catch(error => {
                if (error.response.status == 409) {
                    setSnackbarSuccess({
                        open: true,
                        message: buttonClicked == "salvar" ? "Flag já cadastrada." : "Flag já agendada.",
                        severity: "error",
                    });
                    return;

                } else if (error.response.status == 400) {
                    setSnackbarSuccess({
                        open: true,
                        message: "Limite de agenda atingido.",
                        severity: "error",
                    });

                    setShowLimparAgendados(true);


                    return;
                }
                else {

                    setSnackbarSuccess({
                        open: true,
                        message: buttonClicked == "salvar" ? "Erro ao cadastrar flag." : "Erro ao agendar flag.",
                        severity: "error",
                    });
                }

            });
    }

    const refazerCadastro = () => {
        axiosInstance.delete("flags/agenda-desfazer-ultimo")
            .then(response => {
                setSnackbarSuccess({
                    open: true,
                    message: "Último cadastro refeito com sucesso.",
                    severity: "success",
                });

                setShowLimparRefazer(false);

                carregarFlags();

            })
            .catch(error => {
                if (error.response.status == 404) {
                    setSnackbarSuccess({
                        open: true,
                        message: "Não há cadastro para refazer.",
                        severity: "error",
                    });
                    return;
                }
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao refazer último cadastro.",
                    severity: "error",
                });
            });
    }

    const salvarAgendados = () => {
        axiosInstance.post("flags/agenda-executar")
            .then(response => {
                setSnackbarSuccess({
                    open: true,
                    message: "Flags agendadas salvas com sucesso.",
                    severity: "success",
                });

                setShowLimparAgendados(false);
                carregarFlags();
            })
            .catch(error => {
                if (error.response.status == 404) {
                    setSnackbarSuccess({
                        open: true,
                        message: "Não há flags agendadas para salvar.",
                        severity: "error",
                    });
                    return;
                }
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao salvar flags agendadas.",
                    severity: "error",
                });
            });
    }

    const limparRefazer = () => {
        axiosInstance.delete("flags/limpar-refazer")
            .then(response => {
                setSnackbarSuccess({
                    open: true,
                    message: "Refazer limpo com sucesso.",
                    severity: "success",
                });

                setShowLimparRefazer(false);
            })
            .catch(error => {
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao limpar refazer.",
                    severity: "error",
                });
            });
    }

    const limparAgendados = () => {
        axiosInstance.delete("flags/agenda-limpar")
            .then(response => {
                setSnackbarSuccess({
                    open: true,
                    message: "Agendados limpos com sucesso.",
                    severity: "success",
                });

                setShowLimparAgendados(false);
            })
            .catch(error => {
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao limpar agendados.",
                    severity: "error",
                });
            });
    }

    return (
        <>
            {
                isAdmin ?
                    <div className={styles['container']}>
                        <Header></Header>
                        <h1 className={styles['container__titulo']}>Gerenciar Flags</h1>
                        <div className={styles['content']}>
                            <FlagsList areas={areas} carregarFlags={carregarFlags} />

                            <Divider orientation="vertical" flexItem></Divider>

                            <div className={styles['cadastrar__form']}>
                                <form
                                    autoComplete="off"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <h1>Nova Tecnologia</h1>
                                    <TextField
                                        {...register("nome")}
                                        id="nome"
                                        label="Nome"
                                        variant="outlined"
                                        error={errors.nome}
                                        helperText={errors.nome?.message}
                                        style={styleMui.input}
                                    />
                                    <Autocomplete
                                        style={styleMui.input}
                                        id="area"
                                        freeSolo
                                        options={areas.map((area) => area.nome)}
                                        renderInput={(params) => (
                                            <TextField
                                                id="area"
                                                label="Area"
                                                variant="outlined"
                                                error={errors.area}
                                                helperText={errors.area?.message}
                                                {...params}
                                                {...register("area")}
                                            />
                                        )}

                                    />
                                    <Button
                                        onClick={() => setButtonClicked("salvar")}
                                        type="submit"
                                        style={{ ...styleMui.buttonForm, color: "#fff", backgroundColor: "var(--color-azul)" }}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        onClick={() => setButtonClicked("agendar")}
                                        type="submit"
                                        style={{ ...styleMui.buttonForm, color: "#fff", backgroundColor: "#ffb55f" }}
                                    >
                                        Agendar para salvar
                                    </Button>
                                </form>


                            </div>
                        </div>
                        <div className={styles['float-buttons']}>
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                                {
                                    showLimparRefazer &&
                                    <Button
                                        onClick={limparRefazer}
                                        variant="contained"
                                        startIcon={<DeleteSweepIcon />}
                                        style={{ color: "#000", backgroundColor: "#CDEAF9" }}
                                    >
                                        Limpar "Refazer"
                                    </Button>
                                }
                                {
                                    showLimparAgendados &&
                                    <Button
                                        onClick={limparAgendados}
                                        variant="contained"
                                        startIcon={< AutoDeleteIcon />}
                                        style={{ color: "#000", backgroundColor: "#CDEAF9" }}
                                    >
                                        Limpar Agendados
                                    </Button>
                                }
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                                <Button
                                    onClick={refazerCadastro}
                                    variant="contained"
                                    startIcon={<UndoIcon />}
                                    style={{ color: "#000", backgroundColor: "#FFA0A0" }}
                                >
                                    Refazer útilmo cadastro
                                </Button>
                                <Button
                                    onClick={salvarAgendados}
                                    variant="contained"
                                    startIcon={<BeenhereIcon />}
                                    style={{ color: "#000", backgroundColor: "#B5FF9B" }}
                                >
                                    Salvar agendados
                                </Button>
                            </Box>

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
                    </div >
                    :
                    <NotFound />
            }
        </>

    )
}

export default Admin;
