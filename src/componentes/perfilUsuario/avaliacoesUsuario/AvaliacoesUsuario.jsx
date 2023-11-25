import React from "react";
import styles from "../../../pages/perfilUsuario/perfilUsuario.module.css"
import { Box } from "@mui/system";
import BarraEstrelas from "./BarraEstrelas/BarraEstrelas";
import { Rating } from "@mui/material";

const AvaliacoesUsuario = (props) => {

    const { avaliacao, totalAvaliacoes, mediaEstrelas } = props;

    return (
        <>
            <h1>Avaliações</h1>
            <div className={styles['avaliacoesUsuario']}>
                <div className={styles['avaliacoesUsuario__titulo']}>
                    <h2>{totalAvaliacoes} avaliações realizadas</h2>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating name="read-only" value={mediaEstrelas} readOnly />
                    </Box>
                </div>
                {avaliacao.map((avaliacao) => {
                    return (
                        <BarraEstrelas key={`qtdEstrelas${avaliacao.qtdEstrela}`} qtdEstrelas={avaliacao.qtdEstrela} numeroAvaliacoes={avaliacao.quantidade} value={avaliacao.porcentagem} />
                    )
                })
                }
            </div>
        </  >
    );
}

export default AvaliacoesUsuario;
