import React from "react";
import styles from "./avaliacoesUsuario.module.css"

import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

const AvaliacoesUsuario = (props) => {

    return (
        <>
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
        </>
    );
}

export default AvaliacoesUsuario;

// comentario.map((comentario, index) => {
//     if (index < 3) {
//         return (
//             <ComentarioPerfil key={`comentario${index}`} nomeUsuario={comentario.nomeUsuario} comentario={comentario.comentario} value={comentario.value} />
//         )
//     }
// })