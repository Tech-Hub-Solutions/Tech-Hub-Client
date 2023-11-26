import React from 'react';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Popper, Paper } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import axiosInstance from '../../../config/axiosInstance';

const MenuArquivo = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const baixarConversaRef = React.useRef(null);


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


    const baixarConversaCsv = () => {

        axiosInstance.get(`/arquivos/conversa/${props.roomCode}/gerar-csv`, {
            responseType: 'blob'
        })
            .then((res) => {
                const file = new Blob([res.data]);
                const fileURL = URL.createObjectURL(file);

                const nomeArquivo = res.headers['content-disposition']
                    .split('filename=')[1]
                    .replace(/\"/g, '');

                baixarConversaRef.current.href = fileURL;
                baixarConversaRef.current.download = nomeArquivo;
                baixarConversaRef.current.click();

                setOpen(false);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div>
            <Button ref={anchorRef} onClick={handleToggle}
            style={{
                padding: '0px',
                minWidth: '0px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
            }}
            >
                <MoreVertIcon />
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement='bottom-end'
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'right top',
                        }}
                    >
                        <Paper elevation={4}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem sx={{ padding: '0px', color: 'transparent' }}>
                                        <a ref={baixarConversaRef}>
                                            <Button
                                                onClick={baixarConversaCsv}
                                                component="label" sx={{ minWidth: '100%', justifyContent: 'flex-start', color: '#FFCB8E', padding: '1vw 2vw' }}
                                                startIcon={<DescriptionIcon />}>
                                                <p style={{ color: "black" }}>Baixar Conversa (CSV)</p>
                                            </Button>
                                        </a>
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
