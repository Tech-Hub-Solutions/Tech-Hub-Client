import React from "react";
import styles from "./comentarioPerfil.module.css"
import { Avatar, Box, Divider, Rating } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

const ComentarioPerfil = (props) => {

    return (
        <div className={styles['divider']}>
            <div className={styles['comentario']}>
                <div className={styles['comentario__fotoPerfil']}>
                    <Avatar />
                </div>
                <div className={styles['comentario__content']}>
                    <h1>{props.nomeUsuario}</h1>
                    <div className={styles['infoUsuario__nacionalidade']}>
                        {/* <a href=""><img src={LinkedinImg} alt={'Bandeira do ' + props.pais} /></a> */}
                        <ReactCountryFlag countryCode="BR" svg style={{
                            fontSize: '1.3em',
                            lineHeight: '1.3em',
                            marginRight: '8px',
                            verticalAlign: 'middle',
                        }} />
                        <h4>Brasil</h4>
                    </div>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating name="read-only" value={Number(props.value)} readOnly />
                    </Box>
                    <p>{props.comentario}</p>
                </div>
            </div>
            <Divider style={{ margin: '32px 0' }} />
        </div>
    );
}

export default ComentarioPerfil;