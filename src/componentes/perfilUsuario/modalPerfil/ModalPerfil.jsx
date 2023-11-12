import { Dialog, DialogTitle } from "@mui/material";
import styles from "./modalPerfil.module.css";
import React from 'react';

const ModalPerfil = ({ isModalEdicaoOpen, setModalEdicaoOpen }) => {

    const handleClose = () => {
        setModalEdicaoOpen(false);
    };

    const stylesCSS = {
        dialogContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            height: "700px",
            width: "680px",
            padding: "58px 44px"
        },
        dialogTitle: {
            color: "var(--color-azul)",
            fontFamily: "Montserrat, sans-serif",
            textAlign: "center",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            padding: "0px",
            marginBottom: "40px"
        }
    }


    return (
        <Dialog
            open={isModalEdicaoOpen}
            onClose={handleClose}
            PaperProps={{
                sx: stylesCSS.dialogContainer,
            }}>
            <DialogTitle sx={stylesCSS.dialogTitle}>Editar perfil</DialogTitle>
        </Dialog>
    );
};

export default ModalPerfil;
