import { useEffect, useRef, useState } from 'react';
import styles from './conversaContent.module.css'
import axiosInstance from '../../../config/axiosInstance';
import moment from 'moment-timezone';
import { Avatar } from '@mui/material'
import Picker from "@emoji-mart/react";
import i18n from '@emoji-mart/data/i18n/pt.json'

const ConversaContent = (props) => {

    const { conversaSelecionada, setConversaSelecionada, stompClient } = props;
    const usuarioId = sessionStorage.getItem('usuarioId');
    const [texto, setTexto] = useState('');

    const [mensagens, setMensagens] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
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

    const postarMensagem = (roomCode) => {
        let sala;
        if (roomCode) {
            sala = roomCode;
        } else {
            sala = conversaSelecionada?.roomCode;
        }

        axiosInstance.post(`/conversas/sala/${sala}`, {
            texto
        }).then((response) => {
            setTexto('');
        }).catch((error) => {
            console.log(error);
        })
    }

    const iniciarConversa = async () => {
        return axiosInstance.post(`/conversas/iniciar/${conversaSelecionada?.idPrimeiraConversa}`)
            .then((response) => {
                if (response.status == 200) {
                    const roomCode = response.data.roomCode;
                    setConversaSelecionada((conversaSelecionada) => {
                        return {
                            ...conversaSelecionada,
                            idPrimeiraConversa: null,
                            roomCode: roomCode
                        }
                    });


                    postarMensagem(roomCode);
                }
            }).catch((error) => {
                console.log(error);
            })
    }



    const enviarMensagem = (event) => {
        event.preventDefault();

        if (conversaSelecionada?.idPrimeiraConversa) {
            iniciarConversa();
        } else {
            postarMensagem();
        }
    }

    const onEmojiClick = (emojiObject) => {
        const input = inputRef.current;
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        const messageText = texto;

        // Insert the emoji at the cursor position
        const newMessageText =
            messageText.substring(0, startPos) +
            emojiObject.native +
            messageText.substring(endPos, messageText.length);

        setTexto(newMessageText);

        // Use setTimeout to focus after updating the message
        setTimeout(() => {
            input.focus();
            input.setSelectionRange(startPos + emojiObject.native.length, startPos + emojiObject.native.length);
        }, 0);
    };

    useEffect(() => {
        contentMessagesRef.current.scrollTop = contentMessagesRef.current.scrollHeight;
    }, [mensagens])

    return (
        <>
            <div className={styles['conversa-content']}>
                <div className={styles['conversa-content__header']}>
                    <div className={styles['conversa-content__header__info']}>
                        <div className={styles['conversa-content__header__info__foto']}>
                            {
                                conversaSelecionada?.usuario?.foto ?
                                    <img src={conversaSelecionada?.usuario?.foto} alt="Foto do usuário" />
                                    :

                                    <Avatar />
                            }
                        </div>
                        <div className={styles['conversa-content__header__info__nome']}>
                            <h2>{conversaSelecionada?.usuario?.nome}</h2>
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
                                    ${(mensagem.usuarioId == usuarioId ? styles['conversa-content__mensagem--propria'] : "")}`
                                }
                            >
                                <div className={styles['conversa-content__mensagem__info']}>
                                    <div className={styles['conversa-content__mensagem__info__texto']}>
                                        <p>{mensagem.texto}</p>
                                    </div>
                                </div>
                                <div className={styles['conversa-content__mensagem__info__data']}>
                                    <p>{moment(mensagem.dtHora).format("YYYY-MM-DD HH:mm")}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={enviarMensagem} className={styles['conversa-content__enviar-mensagem']}>
                    <input
                        ref={inputRef}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <div>
                        {
                            showPicker ?
                                <img
                                    className={styles['emoji-icon']}
                                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile-fill.svg"
                                    onClick={() => setShowPicker((val) => !val)}
                                /> :
                                <img
                                    className={styles['emoji-icon']}
                                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                    onClick={() => setShowPicker((val) => !val)}
                                />

                        }

                        {showPicker && (
                            <div className={styles['emoticons']}>
                                <Picker i18n={i18n} onEmojiSelect={onEmojiClick} />
                            </div>
                        )}
                    </div>

                    <button className={
                        styles['conversa-content__enviar-mensagem__botao']} >Enviar</button>
                </form>
            </div>
        </>
    )
}

export default ConversaContent;