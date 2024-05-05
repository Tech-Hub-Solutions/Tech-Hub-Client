import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, MenuItem, MenuList } from "@mui/material";
import styles from "./flagsList.module.css";
import styled from "@emotion/styled";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import axiosInstance from "../../config/axiosInstance";
import SnackbarCustom from "../shared/snackbar/SnackbarCustom";

const FlagsList = ({ areas, carregarFlags }) => {
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const [snackbarSuccessOpen, setSnackbarSuccess] = React.useState({});

    const toggleDropdown = (area) => {
        if (openDropdowns.some(dropdown => dropdown === area)) {
            setOpenDropdowns(openDropdowns.filter(dropdown => dropdown !== area));
        } else {
            setOpenDropdowns([...openDropdowns, area]);
        }
    };

    const muiStyle = {
        buttonMenu: {
            minWidth: '0px',
            justifyContent: 'flex-start',
            padding: '0.7rem 1vw'
        },
        iconButtonMenu: {
            width: '1.8rem',
            height: '1.8rem',
            padding: '0px',
            margin: '0px',
        },
        buttonText: {
            textTransform: 'none',
            color: 'var(--color-cinza)',
            fontSize: '1rem'
        }
    }


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const importarFlag = (e) => {
        const arquivo = e.target.files[0];

        if (arquivo.type !== 'text/plain') {
            setSnackbarSuccess({ open: true, message: "O arquivo deve ser do tipo .txt!", severity: 'error' });
            return;
        }


        const formData = new FormData();

        formData.append('file', arquivo);

        axiosInstance.post('flags/txt/importar', formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                carregarFlags();
                setSnackbarSuccess({ open: true, message: "Flags importadas com sucesso!", severity: 'success' });
            })
            .catch((error) => {
                setSnackbarSuccess({ open: true, message: "Erro ao importar flags!", severity: 'error' });
            });
    }

    const exportar = () => {
        axiosInstance.get('flags/txt/exportar', {
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'flags.txt');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className={styles['admin_flags']}>

            <div className={styles['admin_flags__buttons']}>
                <Button component="label"
                    sx={[muiStyle.buttonMenu, { color: '#FF9BFB' }]}
                    startIcon={<SaveAltIcon sx={[{ color: '#FF9BFB' }, muiStyle.iconButtonMenu]} />}
                >
                    <a style={muiStyle.buttonText} onClick={exportar}>Exportar</a>
                </Button>

                <Button component="label" sx={[muiStyle.buttonMenu, { color: "#FFA0A0" }]}
                    startIcon={
                        <UploadFileIcon sx={muiStyle.iconButtonMenu} />
                    }>
                    <p style={muiStyle.buttonText}>Importar</p>
                    <VisuallyHiddenInput type="file" onChange={(e) => importarFlag(e)} accept=".txt" />
                </Button>

            </div>
            <div className={styles['admin_flags__areas']}>

                {
                    areas.map((area) => (
                        <div key={`admin_flags__areas__${area.nome}`} className={styles['admin_flags__areas__area']}>
                            <div className={styles['admin_flags__areas__area__titulo']}>
                                <h3>{area.nome}</h3>
                                <Button
                                    onClick={() => toggleDropdown(area.nome)}
                                    sx={{
                                        borderRadius: '50%',
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        minWidth: '1.5rem',
                                        minHeight: '1.5rem',
                                    }}
                                >
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            fontSize: '2rem',
                                            color: 'var(--color-azul)',
                                            transform: openDropdowns.some(dropdown => dropdown === area.nome) ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease-in-out',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Button>
                            </div>

                            <div className={`${styles['admin_flags__areas__area__dropdown']}
                            ${openDropdowns.some(dropdown => dropdown === area.nome)
                                    ? styles['opened-dropdown'] : styles['closed-dropdown']
                                }`}
                            >
                                <div className={[`${styles['admin_flags__areas__area__tecnologias']} ${styles['area-header']}`]}>
                                    <p>ID</p>
                                    <p>Nome</p>
                                </div>
                                {

                                    area?.tecnologias.map((tecnologia) => (
                                        <div key={`tecnologias__row__${tecnologia.nome}`} className={styles['admin_flags__areas__area__tecnologias']}>
                                            <p>{tecnologia.id}</p>
                                            <p>{tecnologia.nome}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
            <SnackbarCustom
                snackbarOpen={snackbarSuccessOpen.open}
                message={snackbarSuccessOpen.message}
                severity={snackbarSuccessOpen.severity}
                setSnackbarOpen={() => {
                    setSnackbarSuccess((prevState) => ({
                        ...prevState,
                        open: false,
                    }));
                }}
            ></SnackbarCustom>
        </div>
    )
}

export default FlagsList;
