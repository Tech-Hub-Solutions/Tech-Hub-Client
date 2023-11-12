import React from "react";
import styles from "../../../pages/perfilUsuario/PerfilUsuario.module.css"
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import axiosInstance from "../../../config/axiosInstance";

const InfoAdicional = (props) => {

    const { usuario, setUsuario } = props;

    const recomendar = () => {
        axiosInstance.put(`/perfis/recomendar/${usuario?.idUsuario}`)
            .then((res) => {
                setUsuario({
                    ...usuario,
                    isRecomendado: !usuario?.isRecomendado,
                    qtdRecomendacoes: usuario?.isRecomendado ? usuario?.qtdRecomendacoes - 1 : usuario?.qtdRecomendacoes + 1
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const ButtonExplorarTalentos = styled(Button)({
        fontFamily: "Montserrat, sans-serif",
        padding: "4px 16px",
        borderRadius: "6px",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: "transparent",
        color: "#0f9eea",
        border: "2px solid #0F9EEA",
        marginTop: "8px"
    });

    return (
        <div className={styles['sectionComentariosAvaliacoes__adicionais']}>
            <h1>Informações adicionais</h1>
            {
                usuario.isPerfilFreelancer &&
                <>
                    <div className={styles['adicionais__informacoes']}>
                        <h4>{usuario?.qtdFavoritos} </h4>
                        <p>Empresas interessadas</p>
                    </div>
                </>
            }
            <div className={styles['adicionais__informacoes']}>
                <h4>{usuario?.qtdRecomendacoes}</h4>
                <p>Recomendações</p>
            </div>
            {
                !usuario.isOwnProfile &&
                <ButtonExplorarTalentos
                    onClick={recomendar}
                    sx={{
                        backgroundColor: usuario?.isRecomendado ? "var(--color-azul) !important" : "transparent",
                        color: usuario?.isRecomendado ? "var(--color-branco) !important" : "#0f9eea !important",
                    }}>
                    {usuario?.isRecomendado ? "Recomendado" : "Recomendar"}
                </ButtonExplorarTalentos>
            }
        </div>
    )
}

export default InfoAdicional;