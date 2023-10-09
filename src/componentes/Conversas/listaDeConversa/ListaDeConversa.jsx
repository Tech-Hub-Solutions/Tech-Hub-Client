import { useEffect, useState } from 'react';
import styles from './listaDeConversa.module.css'
import moment from 'moment-timezone';
import { Avatar } from '@mui/material'
import { TextField, Box, List, ListItemButton } from '@mui/material';
import SeachIcon from '../../../assets/images/icons/Search.svg'

const ListaDeConversa = (props) => {
    const { conversas, setConversaSelecionada, conversaSelecionada } = props;
    const [conversasFiltradas, setConversasFiltradas] = useState(conversas);
    const [nomePesquisado, setNomePesquisado] = useState('');

    useEffect(() => {
        setConversasFiltradas(conversas);
    }, [conversas]);

    const pesquisarConversas = (nome) => {
        setNomePesquisado(nome);
        if (nome == '') return setConversasFiltradas(conversas);
        let conversasFiltradas = conversas.filter(conversa => conversa.usuario?.nome.toLowerCase().includes(nome.toLowerCase()));
        setConversasFiltradas(conversasFiltradas);
    }

    const letrasPesquisada = (nome, nomePesquisado) => {
        const regex = new RegExp(`(${nomePesquisado})`, 'gi');
        return nome.split(regex).map((part, index) => (
            regex.test(part) ? <span key={index} style={{ color: 'orange' }}>{part}</span> : part
        ));
    }

    return (
        <>
            <div className={styles['lista-de-conversa']}>
                <div className={styles['lista-de-conversa__header']}>
                    <h1>Conversas</h1>
                </div>

                <div className={styles['lista-de-conversa__pesquisa']}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                        <TextField
                            id="input-with-icon-textfield"
                            placeholder='Pesquisar'
                            onChange={(e) => pesquisarConversas(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <img src={SeachIcon} alt="pesquisar" />
                                ),
                            }}
                            variant="standard"
                            fullWidth={true}
                            sx={
                                {
                                    "& .MuiOutlinedInput-root:hover": {
                                        "& > fieldset": {
                                            borderColor: "orange"
                                        }
                                    },

                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'var(--color-azul)',
                                    },

                                }
                            }
                        />
                    </Box>
                </div>

                <div className={styles['lista-de-conversa__conversas']}>
                    <List component="nav" aria-label="lista de conversas"
                        divider={true}
                        sx={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.8vw',
                                maxHeight: '70vh',
                            }
                        }>

                        {
                            conversasFiltradas.length > 0 ?
                                conversasFiltradas.map((conversa, index) => {
                                    return (
                                        <ListItemButton
                                            key={"conversa" + index}
                                            selected={conversaSelecionada?.roomCode == conversa.roomCode}
                                            onClick={() => setConversaSelecionada(conversa)}
                                            sx={
                                                {
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    gap: '0.4vw',
                                                    borderRadius: '0.5rem',
                                                    padding: '1vw',
                                                    /* Aparecer 3 pontos se estourar */
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
                                                    boxSizing: 'border-box',
                                                    '&:hover': {
                                                        backgroundColor: '#def3ff',
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#c8ecff',
                                                    },
                                                    '&.Mui-selected:hover': {
                                                        backgroundColor: '#c8ecff',
                                                    },
                                                }
                                            }
                                        >

                                            <div className={styles['lista-de-conversa__conversa__foto']}>
                                                <Avatar src={conversa.usuario?.pathPerfilImage}>
                                                    {conversa.usuario?.nome[0]}
                                                </Avatar>
                                            </div>
                                            <div className={styles['lista-de-conversa__conversa__info']}>
                                                <div className={styles['lista-de-conversa__conversa__info__nome']}>
                                                    <p>
                                                        {
                                                            nomePesquisado != '' ?
                                                                letrasPesquisada(conversa.usuario?.nome, nomePesquisado)
                                                                :
                                                                conversa.usuario?.nome
                                                        }
                                                    </p>

                                                </div>
                                                <div className={styles['lista-de-conversa__conversa__info__mensagem']}>
                                                    <p>{conversa.mensagem?.texto}</p>
                                                </div>
                                            </div>
                                            <div className={styles['lista-de-conversa__conversa__info__data']}>
                                                <p>{moment(conversa.mensagem?.dtHora).format("HH:mm")}</p>
                                            </div>
                                        </ListItemButton>
                                    )

                                })
                                :
                                <div className={styles['lista-de-conversa__conversa__info__nome']}>
                                    <p>Nenhuma conversa encontrada</p>
                                </div>

                        }


                    </List>
                </div>
            </div >
        </>
    )
}

export default ListaDeConversa;