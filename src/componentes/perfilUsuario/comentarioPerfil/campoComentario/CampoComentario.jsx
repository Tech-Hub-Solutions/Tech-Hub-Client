import React from "react";
import styles from "./campoComentario.module.css"

import ReactCountryFlag from "react-country-flag";
import { Avatar, Box, Rating, TextField } from "@mui/material";
import BlueBackgroundButton from "../../../shared/BlueButton/BlueBackgroundButton";
import axiosInstance from "../../../../config/axiosInstance";

const CampoComentario = (props) => {

    const [qtdEstrelas, setQtdEstrelas] = React.useState(2);
    const [comentarioUsuario, setComentarioUsuario] = React.useState("");

    const fazerComentario = () => {
        axiosInstance.post(`/perfis/avaliacao/${props.idRequisicao}`, {
            comentario: comentarioUsuario,
            qtdEstrela: qtdEstrelas,
        })
            .then((response) => {
                props.setComentario((prev) => {
                    if (!prev) {
                        return response.data
                    }
                    return [
                        response.data,
                        ...prev
                    ]
                })

                setComentarioUsuario('')
            })
    }

    return (
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
                    <Rating
                        name="simple-controlled"
                        value={qtdEstrelas}
                        onChange={(event, newValue) => {
                            setQtdEstrelas(newValue);
                        }}
                    />
                </Box>
                <div className={styles['comentario__input']}>
                    <TextField style={{ width: '95%', fontFamily: 'Montserrat' }}
                        id="outlined-multiline-static"
                        label="Adicione um comentário"
                        multiline
                        rows={4}
                        value={comentarioUsuario}
                        onChange={(e) => {
                        setComentarioUsuario(e.target.value)
                        }}
                    />
                </div>
                <div className={styles['comentario__button']}>
                    <BlueBackgroundButton onClick={fazerComentario}>Comentar</BlueBackgroundButton>
                </div>
            </div>
        </div>
    );
}

export default CampoComentario;