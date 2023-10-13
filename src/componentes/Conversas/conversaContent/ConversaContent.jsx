import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './conversaContent.module.css'
import axiosInstance from '../../../config/axiosInstance';
import { Avatar } from '@mui/material'
import ConversaInput from './ConversaInput/ConversaInput';
import moment from 'moment-timezone';
import ConversaMensagem from './conversaMensagem/ConversaMensagem';

const ConversaContent = (props) => {

    const { conversaSelecionada, setConversaSelecionada, stompClient } = props;
    const usuarioId = sessionStorage.getItem('usuarioId');
    const stompConversa = useRef(null);

    const [mensagens, setMensagens] = useState([]);
    const inputRef = useRef("");
    const contentMessagesRef = useRef("");

    useEffect(() => {

        carregarMensagens();

        if (!conversaSelecionada?.idPrimeiraConversa) {
            const conversa = stompClient?.subscribe(`/topic/sala/${conversaSelecionada?.roomCode}`, (response) => {
                const mensagem = JSON.parse(response.body);
                setMensagens((mensagens) => [...mensagens, mensagem]);
            });

            stompConversa.current = conversa;
        }

        inputRef.current.focus();

        return () => {
            stompConversa.current?.unsubscribe();
        }
    }, [conversaSelecionada])




    const carregarMensagens = () => {
        axiosInstance.get(`/conversas/sala/${conversaSelecionada?.roomCode}`)
            .then((response) => {
                if (response.data.length > 0) {
                    // Adicionar mensagem de data, caso seja a primeira mensagem do dia
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
                            <Avatar sx={{ width: 56, height: 56 }} src={conversaSelecionada.usuario?.pathPerfilImage}>
                                {conversaSelecionada.usuario?.nome[0]}
                            </Avatar>
                        </div>
                        <div className={styles['conversa-content__header__info__nome']}>
                            <p>{conversaSelecionada?.usuario?.nome}</p>
                        </div>
                    </div>
                </div>
                <div className={styles['conversa-content__mensagens']} 
                style={{
                    opacity: mensagens.length > 0 ? 1 : 0,
                    scrollBehavior: mensagens.length > 0 ? "smooth" : "none",
                    transition: "0.5s"
                }}
                ref={contentMessagesRef}>
                    {mensagens.map((mensagem, index) => {
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
                    inputRef={inputRef}
                />

            </div>
        </>
    )
}

export default ConversaContent;