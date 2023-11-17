import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./admin.module.css";
import FlagsList from "../../componentes/Admin/FlagsList";
import * as yup from "yup";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BlueBackgroundButton from "../../componentes/shared/BlueButton/BlueBackgroundButton";
import Header from "../../componentes/shared/Header/Header";

const Admin = () => {
    const [areas, setAreas] = useState([]);

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

    const onSubmit = (data) => {
    }

    React.useEffect(() => {
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
    }, []);



    return (
        <div className={styles['container']}>
            <Header></Header>
            <h1 className={styles['container__titulo']}>Gerenciar Flags</h1>
            <div className={styles['content']}>
                <FlagsList areas={areas} />

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
                            type="submit"
                            style={{...styleMui.buttonForm, color: "#fff", backgroundColor: "var(--color-azul)" }}
                        >
                            Salvar
                        </Button>
                        <Button
                            type="submit"
                            style={{...styleMui.buttonForm, color: "#fff", backgroundColor: "#ffb55f" }}
                        >
                            Agendar para salvar
                        </Button>
                    </form>


                </div>
            </div>
        </div >
    )
}

export default Admin;