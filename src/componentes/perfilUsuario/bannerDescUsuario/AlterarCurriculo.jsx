import React from "react";
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance.js";
import SnackbarCustom from "../../shared/snackbar/SnackbarCustom.jsx";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { LoadingButton } from "@mui/lab";

const AlterarCurriculo = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const muiStyle = {
        editButton: {
            fontFamily: "Montserrat, sans-serif",
            textTransform: "none",
            fontStyle: "normal",
            fontSize: "16px",
            padding: "10px 16px",
            borderRadius: "6px",
            fontWeight: "600",
            backgroundColor: "#0F9EEA",
            color: "#fdfdfd",
            lineHeight: "1.3",
            marginRight: '8px'
        },
        editIcon: {
            padding: '0px',
            margin: '0px',
            color: "#fdfdfd",
        },
        menuItem: {
            padding: '0px',
            color: 'transparent'
        },
        buttonMenu: {
            minWidth: '100%',
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
            color: '#000000',
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


    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const enviarCurriculo = (e) => {
        const arquivo = e.target.files[0];

        // se não for txt, abrir snackbar
        if (arquivo.type !== 'text/plain') {
            setSeverity('error');
            setMessage('Formato de arquivo inválido');
            setSnackbarOpen(true);
            return;
        }


        const formData = new FormData();

        formData.append('tipoArquivo', 'CURRICULO');
        formData.append('arquivo', arquivo);

        setIsLoading(true);


        axiosInstance.put(`/perfis/arquivo`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setSeverity('success');
                setMessage('Currículo atualizado com sucesso');
                setSnackbarOpen(true);

            }).catch((error) => {
                setSeverity('error');
                setMessage('Erro ao atualizar currículo');
                setSnackbarOpen(true);
            })
            .finally(() => {
                setIsLoading(false);
            });

        handleClose(e);
    }


    return (
        <>
            <LoadingButton
                sx={muiStyle.editButton}
                variant="contained"
                component="label"
                ref={anchorRef} onClick={handleToggle}
                endIcon={<DescriptionIcon sx={muiStyle.editIcon} />}
                loadingPosition="end"
                loading={isLoading}

            >
                Currículo
            </LoadingButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement='bottom-start'
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'right bottom',
                        }}
                    >
                        <Paper elevation={4}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}
                                >
                                    {
                                        props.curriculo &&
                                        <MenuItem sx={muiStyle.menuItem}>
                                            <Button component="label"
                                                sx={[muiStyle.buttonMenu, { color: '#FF9BFB' }]}
                                                startIcon={<SaveAltIcon sx={[{ color: '#FF9BFB' }, muiStyle.iconButtonMenu]} />}
                                                disabled={!props.curriculo}
                                            >
                                                <a style={muiStyle.buttonText} href={props.curriculo} download>Baixar currículo</a>
                                            </Button>
                                        </MenuItem>
                                    }

                                    <MenuItem sx={muiStyle.menuItem}>
                                        <Button component="label" sx={[muiStyle.buttonMenu, { color: "#FFA0A0" }]}
                                            startIcon={
                                                <UploadFileIcon sx={muiStyle.iconButtonMenu} />
                                            }>
                                            <p style={muiStyle.buttonText}>Subir novo currículo</p>
                                            <VisuallyHiddenInput type="file" onChange={(e) => enviarCurriculo(e)} accept=".txt" />
                                        </Button>
                                    </MenuItem>

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <SnackbarCustom
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity={severity}
                message={message}
            />
        </ >
    )
}

export default AlterarCurriculo;