import React from 'react';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Popper, Paper } from "@mui/material";
import styled from '@emotion/styled';
import Clips from '../../../../assets/images/icons/Clips.svg'
import ImageImg from '../../../../assets/images/icons/image.png'
import DocumentImg from '../../../../assets/images/icons/documento.png'
import { resizeImage } from '../../../../utils/geral';

const MenuArquivo = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const { setArquivo } = props;


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

        const arquivoDetail = {
            file: arquivo,
            tipo: tipoAnexo
        }


        if (tipoAnexo == "imagem") {
            try {
                resizeImage(arquivo, (blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);

                    reader.onloadend = () => {
                        arquivoDetail.url = reader.result;
                        arquivoDetail.file = new File([blob], arquivo.name, { type: arquivo.type });
                        setArquivo(arquivoDetail);
                    };
                });
            } catch (err) {
                alert("Erro ao carregar imagem");
            }
        } else {
            setArquivo(arquivoDetail);
        }

        handleClose(e);
    }

    return (
        <div>
            <Button ref={anchorRef} onClick={handleToggle}  >
                <div><img src={Clips} /></div>
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement='top-end'
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
                                    <MenuItem sx={{ padding: '0px', color: 'transparent' }}>
                                        <Button component="label" sx={{ minWidth: '100%', justifyContent: 'flex-start', color: '#FF9BFB', padding: '1vw 2vw' }}
                                            startIcon={<img style={{ width: '25px' }} src={ImageImg} />}>
                                            <p style={{ color: "black" }}>Imagem</p>
                                            <VisuallyHiddenInput type="file" onChange={(e) => selecionarAnexo(e, 'imagem')} />
                                        </Button>
                                    </MenuItem>
                                    <MenuItem sx={{ padding: '0px', color: 'transparent' }}>
                                        <Button component="label" sx={{ minWidth: '100%', justifyContent: 'flex-start', color: '#FFA0A0', padding: '1vw 2vw' }}
                                            startIcon={<img style={{ width: '25px' }} src={DocumentImg} />}>
                                            <p style={{ color: "black" }}>Arquivos</p>
                                            <VisuallyHiddenInput type="file" onChange={(e) => selecionarAnexo(e, 'documento')} />
                                        </Button>
                                    </MenuItem>

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div >
    )
}

export default MenuArquivo;
