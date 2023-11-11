import React from "react";
import styles from "./comentarioPerfil.module.css"
import { Avatar, Box, Divider, Rating } from "@mui/material";
import CountryInformation from "../../../shared/CountryInformation/CountryInformation";

const ComentarioPerfil = ({ comentario }) => {

    return (
        <div className={styles['divider']}>
            <div className={styles['comentario']}>
                <div className={styles['comentario__fotoPerfil']}>
                    <Avatar src={comentario.urlFotoPerfil} >
                        {comentario.avaliador[0]}
                    </Avatar>
                </div>
                <div className={styles['comentario__content']}>
                    <h1>{comentario.avaliador}</h1>
                    <div className={styles['infoUsuario__nacionalidade']}>
                        <CountryInformation pais={comentario.pais} />
                    </div>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating name="read-only" value={Number(comentario.qtdEstrela)} readOnly />
                    </Box>
                    <p>{comentario.comentario}</p>
                </div>
            </div>
            <Divider style={{ margin: '32px 0' }} />
        </div>
    );
}

export default ComentarioPerfil;