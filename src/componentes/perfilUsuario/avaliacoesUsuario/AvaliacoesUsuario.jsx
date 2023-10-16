import React from "react";
import styles from "./avaliacoesUsuario.module.css"

import { LinearProgress, Rating } from "@mui/material";
import { Box, border } from "@mui/system";

const AvaliacoesUsuario = (props) => {

    const [progress1, setProgress1] = React.useState(50);
    const [progress2, setProgress2] = React.useState(20);
    const [progress3, setProgress3] = React.useState(14);
    const [progress4, setProgress4] = React.useState(0);
    const [progress5, setProgress5] = React.useState(6);

    return (
        <div className={styles['avaliacoesUsuario']}>
            <div className={styles['avaliacoesUsuario__titulo']}>
                <h2>{props.numeroAvaliacoes} avaliações realizadas</h2>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Rating name="read-only" value={props.value} readOnly />
                </Box>
            </div>
            <div className={styles['avaliacoesUsuario__barrasProgresso']}>
                <div className={styles['avaliacoesUsuario__barra']}>
                    <div className={styles['numeroEstrelas']}>
                        <h5>5 estrelas</h5>
                    </div>
                    <div className={styles['barra__progresso']}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={progress1} />
                        </Box>
                        <p>({progress1})</p>
                    </div>
                </div>
                <div className={styles['avaliacoesUsuario__barra']}>
                    <div className={styles['numeroEstrelas']}>
                        <h5>4 estrelas</h5>
                    </div>
                    <div className={styles['barra__progresso']}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={progress2} />
                        </Box>
                        <p>({progress2})</p>
                    </div>
                </div>
                <div className={styles['avaliacoesUsuario__barra']}>
                    <div className={styles['numeroEstrelas']}>
                        <h5>3 estrelas</h5>
                    </div>
                    <div className={styles['barra__progresso']}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={progress3} />
                        </Box>
                        <p>({progress3})</p>
                    </div>
                </div>
                <div className={styles['avaliacoesUsuario__barra']}>
                    <div className={styles['numeroEstrelas']}>
                        <h5>2 estrelas</h5>
                    </div>
                    <div className={styles['barra__progresso']}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={progress4} />
                        </Box>
                        <p>({progress4})</p>
                    </div>
                </div>
                <div className={styles['avaliacoesUsuario__barra']}>
                    <div className={styles['numeroEstrelas']}>
                        <h5>1 estrela</h5>
                    </div>
                    <div className={styles['barra__progresso']}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" sx={{ height: '12px', borderRadius: '6px' }} value={progress5} />
                        </Box>
                        <p>({progress5})</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvaliacoesUsuario;