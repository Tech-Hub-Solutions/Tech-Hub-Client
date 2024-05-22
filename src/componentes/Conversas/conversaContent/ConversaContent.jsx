import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './conversaContent.module.css'
import axiosInstance from '../../../config/axiosInstance';
import { Avatar, Box, Skeleton } from '@mui/material'
import ConversaInput from './ConversaInput/ConversaInput';
import moment from 'moment-timezone';
import ConversaMensagem from './conversaMensagem/ConversaMensagem';
import MenuConversa from './MenuConversa';
import { getCurrentUser } from '@/src/utils/localStoreManager';

const ConversaContent = (props) => {

    const { conversaSelecionada, setConversaSelecionada, stompClient } = props;
    const usuarioId = getCurrentUser()?.id;
    const stompConversa = useRef(null);

    const [mensagens, setMensagens] = useState([]);
    const inputRef = useRef("");
    const contentMessagesRef = useRef("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (conversaSelecionada.roomCode != null) {
            carregarMensagens();

            if (!conversaSelecionada?.idPrimeiraConversa) {
                const conversa = stompClient?.subscribe(`/topic/sala/${conversaSelecionada?.roomCode}`, (response) => {
                    const mensagem = JSON.parse(response.body);
                    setMensagens((mensagens) => [...mensagens, mensagem]);
                });

                stompConversa.current = conversa;
            }
        } else {
            setIsLoading(false);
        }

        inputRef.current.focus();

        return () => {
            if (stompClient?.connected) {
                stompConversa.current?.unsubscribe();
            }
        }
    }, [conversaSelecionada])




    const carregarMensagens = () => {
        axiosInstance.get(`/conversas/sala/${conversaSelecionada?.roomCode}`)
            .then((response) => {
                if (response.data.length > 0) {
                    let mensagens = [];
                    let dataMensagemAnterior = null;
                    response.data.forEach((mensagem) => {
                        const dataMensagemAtual = moment(mensagem.dtHora).tz("America/Sao_Paulo");
                        const dataAtual = moment().tz("America/Sao_Paulo");

                        if (dataMensagemAnterior == null || !dataMensagemAnterior.isSame(dataMensagemAtual, 'day')) {
                            mensagens.push({
                                id: -1,
                                texto: dataMensagemAtual.isSame(dataAtual, 'day') ? "Hoje" : dataMensagemAtual.format("DD/MM/YYYY")
                            });
                        }

                        mensagens.push(mensagem);
                        dataMensagemAnterior = dataMensagemAtual;
                    });
                    setMensagens(mensagens);

                }
            }).catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        contentMessagesRef.current.scrollTop = contentMessagesRef.current.scrollHeight;
    }, [mensagens]);

    return (
        <>
            <div className={styles['conversa-content']} >
                <div className={styles['conversa-content__header']}>
                    <div className={styles['conversa-content__header__info']}>
                        <div className={styles['conversa-content__header__info__foto']}>
                            <Avatar sx={{ width: 56, height: 56 }} src={conversaSelecionada.usuario?.urlFotoPerfil}>
                                {conversaSelecionada.usuario?.nome[0]}
                            </Avatar>
                        </div>
                        <div className={styles['conversa-content__header__info__nome']}>
                            <p>{conversaSelecionada?.usuario?.nome}</p>
                        </div>
                    </div>
                    <MenuConversa roomCode={conversaSelecionada?.roomCode} />
                </div>
                <div className={styles['conversa-content__mensagens']}
                    style={{
                        opacity: mensagens.length > 0 ? 1 : 0.5,
                        scrollBehavior: mensagens.length > 0 ? "smooth" : "none",
                        transition: "0.5s"
                    }}
                    ref={contentMessagesRef}>
                    {
                        isLoading ?
                            <Box width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {Array(7).fill().map((_, index) => (
                                    <Skeleton variant="rectangular" width="25%" height={40} key={`mensagem-${index}`}
                                        sx={{ alignSelf: index % 2 == 0 ? 'flex-start' : 'flex-end' }}
                                    />
                                ))}
                            </Box> :
                            mensagens.map((mensagem, index) => {
                                return (
                                    <ConversaMensagem
                                        mensagem={mensagem} key={`Mensagem${index}`}
                                        usuarioId={usuarioId}
                                        contentMessagesRef={contentMessagesRef}
                                        setConversaSelecionada={setConversaSelecionada}
                                    />
                                )
                            })}
                </div>
                <ConversaInput
                    conversaSelecionada={conversaSelecionada}
                    setConversaSelecionada={setConversaSelecionada}
                    isLoadingMessages={isLoading}
                    inputRef={inputRef}
                />

            </div>
        </>
    )
}

export default ConversaContent;
