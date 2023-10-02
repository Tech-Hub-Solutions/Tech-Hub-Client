import { useEffect, useRef, useState } from 'react';
import styles from './conversaContent.module.css'
import axiosInstance from '../../../config/axiosInstance';
import { Avatar } from '@mui/material'
import ConversaInput from './ConversaInput/ConversaInput';
import { exibirHorario } from '../../../utils/horarios';

const ConversaContent = (props) => {

    const { conversaSelecionada, setConversaSelecionada, stompClient } = props;
    const usuarioId = sessionStorage.getItem('usuarioId');

    const [mensagens, setMensagens] = useState([]);
    const inputRef = useRef("");
    const contentMessagesRef = useRef("");

    useEffect(() => {

        carregarMensagens();

        if (!conversaSelecionada?.idPrimeiraConversa) {
            stompClient?.subscribe(`/topic/sala/${conversaSelecionada?.roomCode}`, (response) => {
                const mensagem = JSON.parse(response.body);
                setMensagens((mensagens) => [...mensagens, mensagem]);
            });
        }

        inputRef.current.focus();

        return () => {
            stompClient?.unsubscribe(`/topic/sala/${conversaSelecionada?.roomCode}`);
        }
    }, [conversaSelecionada])


    const carregarMensagens = () => {
        axiosInstance.get(`/conversas/sala/${conversaSelecionada?.roomCode}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setMensagens(response.data);

                }
            }).catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        contentMessagesRef.current.scrollTop = contentMessagesRef.current.scrollHeight;
    }, [mensagens])

    return (
        <>
            <div className={styles['conversa-content']}>
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
                <div className={styles['conversa-content__mensagens']} ref={contentMessagesRef}>
                    {mensagens.map((mensagem, index) => {
                        return (
                            <div
                                key={"mensagem" + index}
                                className={
                                    `${styles['conversa-content__mensagem']} 
                                    ${(mensagem.usuarioId == usuarioId ? styles['conversa-content__mensagem--propria'] : "")}
                                    `
                                }
                            >
                                <div className={styles['conversa-content__mensagem__info__texto']}>
                                    <p>{mensagem.texto}</p>
                                </div>
                                <div className={styles['conversa-content__mensagem__info__white-space']}>
                                </div>
                                <div className={styles['conversa-content__mensagem__info__data']}>
                                    <p>{exibirHorario(mensagem.dtHora)}</p>
                                </div>
                            </div>
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