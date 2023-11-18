import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./admin.module.css";
import FlagsList from "../../componentes/Admin/FlagsList";
import * as yup from "yup";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../componentes/shared/Header/Header";
import NotFound from "../NotFound/NotFound";
import UndoIcon from '@mui/icons-material/Undo';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SnackbarCustom from "../../componentes/shared/snackbar/SnackbarCustom";

const Admin = () => {
    const [areas, setAreas] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [buttonClicked, setButtonClicked] = useState("");
    const [qtdRefazer, setQtdRefazer] = useState(0);
    const [qtdSalvar, setQtdSalvar] = useState(0);
    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});

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
        axiosInstance.get(`flags`)
            .then(response => {
                const flags = response.data;
                const areasRequest = [...areas];

                flags.forEach((flag) => {

                    const area = areasRequest.find(area => area.nome == flag.area);

                    if (!area) {
                        areasRequest.push({ nome: flag.area, tecnologias: [] });
                    }

                    const tecnologia = area?.tecnologias.find(tecnologia => tecnologia.id == flag.id);
                    if (!tecnologia) {
                        area?.tecnologias.push({
                            id: flag.id,
                            nome: flag.nome
                        });
                    }
                });


                setAreas(areasRequest);
            })
    }

    const recarregarFlags = () => {
        setTimeout(() => {
            carregarFlags();
        }, 1000);
    }

    const onSubmit = (data) => {
        const url = buttonClicked == "salvar" ? "flags" : "flags/agendar";

        axiosInstance.post(url, {
            nome: data.nome,
            area: data.area,
            categoria: data.area == "Soft-skills" ? "soft-skill" : "hard-skill"
        })
            .then(response => {

                if (buttonClicked == "salvar") {
                    setQtdRefazer((prevState) => prevState + 1);
                } else {
                    setQtdSalvar((prevState) => prevState + 1);
                }

                setSnackbarSuccess({
                    open: true,
                    message: buttonClicked == "salvar" ? "Flag cadastrada com sucesso." : "Flag agendada com sucesso.",
                    severity: "success",
                });

                recarregarFlags();
            })
            .catch(error => {
                setSnackbarSuccess({
                    open: true,
                    message: buttonClicked == "salvar" ? "Erro ao cadastrar flag." : "Erro ao agendar flag.",
                    severity: "error",
                });
            });
    }

    const refazerCadastro = () => {
        axiosInstance.post("flags/refazer")
            .then(response => {
                setQtdRefazer((prevState) => prevState - 1);
                setSnackbarSuccess({
                    open: true,
                    message: "Último cadastro refeito com sucesso.",
                    severity: "success",
                });

                recarregarFlags();

            })
            .catch(error => {
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao refazer último cadastro.",
                    severity: "error",
                });
            });
    }

    const salvarAgendados = () => {
        axiosInstance.post("flags/salvar-agendados")
            .then(response => {
                setQtdSalvar((prevState) => prevState - 1);
                setSnackbarSuccess({
                    open: true,
                    message: "Flags agendadas salvas com sucesso.",
                    severity: "success",
                });

                recarregarFlags();
            })
            .catch(error => {
                setSnackbarSuccess({
                    open: true,
                    message: "Erro ao salvar flags agendadas.",
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
                            <FlagsList areas={areas} recarregarFlags={recarregarFlags} />

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
                            {
                                qtdRefazer > 0 &&
                                <Button
                                    onClick={refazerCadastro}
                                    variant="contained"
                                    startIcon={<UndoIcon />}
                                    style={{ color: "#000", backgroundColor: "#FFA0A0" }}
                                >
                                    Refazer útilmo cadastro
                                </Button>
                            }
                            {
                                qtdSalvar > 0 &&
                                <Button
                                    onClick={salvarAgendados}
                                    variant="contained"
                                    startIcon={<BeenhereIcon />}
                                    style={{ color: "#000", backgroundColor: "#B5FF9B" }}
                                >
                                    {qtdSalvar > 1 ? `Salvar últimos ${qtdSalvar} agendados` : `Salvar útilmo agendado`}
                                </Button>
                            }
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