import React from "react";
import styles from "./barraEstrelas.module.css"
import { Box, LinearProgress } from "@mui/material";

const BarraEstrelas = (props) => {
    return (
        <div className={styles['avaliacoesUsuario__barra']}>
            <div className={styles['numeroEstrelas']}>
                <h5>{props.qtdEstrelas} estrelas</h5>
            </div>
            <div className={styles['barra__progresso']}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={Number(props.value)} />
                </Box>
                <p>({props.numeroAvaliacoes})</p>
            </div>
        </div>
    )
}

export default BarraEstrelas;