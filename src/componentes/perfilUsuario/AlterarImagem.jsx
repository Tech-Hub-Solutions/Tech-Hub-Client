import React from "react";
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import styled from "@emotion/styled";
import axiosInstance from "../../config/axiosInstance";
import { resizeImage } from "../../utils/geral";
import { useNavigate } from "react-router-dom";
import SnackBarCustom from "../shared/snackbar/SnackbarCustom.jsx";


const AlterarImagem = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');
    const { loading, setLoading } = props;

    const muiStyle = {
        editButton: {
            backgroundColor: '#FFFF',
            boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.35)',
            padding: '4px',
            width: '2.5rem',
            height: '2.5rem',
            minWidth: '0px',
            minHeight: '0px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': {
                backgroundColor: '#FFFF',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
        },
        editIcon: {
            width: '1.8rem',
            height: '1.8rem',
            padding: '0px',
            margin: '0px',
        },
        menuItem: {
            padding: '0px',
            color: 'transparent'
        },
        buttonMenu: {
            minWidth: '100%',
            justifyContent: 'flex-start',
            padding: '1vw 2vw'
        },
        iconButtonMenu: {
            width: '1.8rem',
            height: '1.8rem',
            padding: '0px',
            margin: '0px',
        },
        buttonText: {
            color: '#000000',
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

    const selecionarAnexo = (e, tipoAnexo) => {
        const arquivo = e.target.files[0];

        try {
            resizeImage(arquivo, (blob) => {
                const formData = new FormData();
                const file = new File([blob], arquivo.name, { type: arquivo.type });

                formData.append('tipoArquivo', tipoAnexo.toUpperCase());
                formData.append('arquivo', file);

                setLoading({
                    value: true,
                    tipoArquivo: tipoAnexo
                });


                axiosInstance.put(`/perfis/arquivo`, formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((response) => {
                        setSeverity('success');
                        setMessage('Imagem alterada com sucesso');
                        setSnackbarOpen(true);


                        setTimeout(() => {
                            navigate(0);
                        }, 1000);

                    }).catch((error) => {
                        setSeverity('error');
                        setMessage('Erro ao subir imagem');
                        setSnackbarOpen(true);
                        setLoading({
                            value: false,
                            tipoArquivo: ''
                        });
                    })
            });



        } catch (err) {
            setSeverity('error');
            setMessage('Erro ao subir imagem');
            setSnackbarOpen(true);
        }

        handleClose(e);
    }



    return (
        <>
            <Button sx={muiStyle.editButton} ref={anchorRef} onClick={handleToggle}  >
                <EditIcon sx={muiStyle.editIcon} />
            </Button>
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
                                    <MenuItem sx={muiStyle.menuItem}>
                                        <Button component="label" sx={[muiStyle.buttonMenu, { color: '#FF9BFB' }]}
                                            startIcon={
                                                <Avatar sx={[{ backgroundColor: '#FF9BFB' }, muiStyle.iconButtonMenu]} />
                                            }>
                                            <p style={muiStyle.buttonText}>Perfil</p>
                                            <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => selecionarAnexo(e, 'PERFIL')} />
                                        </Button>
                                    </MenuItem>
                                    <MenuItem sx={muiStyle.menuItem}>
                                        <Button component="label" sx={[muiStyle.buttonMenu, { color: "#FFA0A0" }]}
                                            startIcon={
                                                <VrpanoIcon sx={muiStyle.iconButtonMenu} />
                                            }>
                                            <p style={muiStyle.buttonText}>Wallpaper</p>
                                            <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => selecionarAnexo(e, 'WALLPAPER')} />
                                        </Button>
                                    </MenuItem>

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <SnackBarCustom
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity={severity}
                message={message}
            />
        </ >
    )
}

export default AlterarImagem;
