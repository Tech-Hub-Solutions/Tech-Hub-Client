import Picker from "@emoji-mart/react";
import i18n from '@emoji-mart/data/i18n/pt.json'
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import styles from './conversaInput.module.css'
import Send from '../../../../assets/images/icons/Send.svg'
import EmojiCinza from '../../../../assets/images/icons/emoji-cinza.svg'
import EmojiAmarelo from '../../../../assets/images/icons/emoji-amarelo.svg'
import MenuArquivo from "./MenuArquivo";
import { Button } from "@mui/material";
import DocumentImg from '../../../../assets/images/icons/documento.png';
import { formatarBytes } from '../../../../utils/geral';
import { LoadingButton } from "@mui/lab";

const ConversaInput = (props) => {
    const [texto, setTexto] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [arquivo, setArquivo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { conversaSelecionada, setConversaSelecionada, inputRef, isLoadingMessages } = props;

    useEffect(() => {
        if (!isLoadingMessages && !isLoading) {
            inputRef.current.focus();
        }

    }, [isLoadingMessages, isLoading])

    const verificarTexto = (event) => {
        const input = event.target;
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';

        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();

            enviarMensagem(event);
        }

    }

    const iniciarConversa = async () => {
        setIsLoading(true);
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
            .finally(() => {
                setIsLoading(false);
            })
    }


    const enviarMensagem = (e) => {
        e.preventDefault();
        inputRef.current.style.height = 'auto';
        setShowPicker(false);
        if (arquivo?.tipo == null) {
            if (!texto || texto.trim() === '') {
                return;
            }
        }
        if (conversaSelecionada?.idPrimeiraConversa) {
            iniciarConversa();
        } else {
            postarMensagem();
        }
    }

    const postarMensagem = (roomCode) => {
        setIsLoading(true);

        let sala;
        if (roomCode) {
            sala = roomCode;
        } else {
            sala = conversaSelecionada?.roomCode;
        }

        const formData = new FormData();
        formData.append('mensagem', texto);

        if (arquivo.tipo != null) {
            formData.append('arquivo', arquivo.file);
            formData.append('tipoArquivo', arquivo.tipo.toUpperCase());
        }

        axiosInstance.post(`/conversas/sala/${sala}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setTexto('');
                setArquivo({});
            }).catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }


    const onEmojiClick = (emojiObject) => {
        const input = inputRef.current;
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        const messageText = texto;

        const newMessageText =
            messageText.substring(0, startPos) +
            emojiObject.native +
            messageText.substring(endPos, messageText.length);

        setTexto(newMessageText);

        setTimeout(() => {
            input.focus();
            input.setSelectionRange(startPos + emojiObject.native.length, startPos + emojiObject.native.length);
        }, 0);
    };


    return (
        <>
            <form onSubmit={enviarMensagem} className={styles['conversa-content__enviar-mensagem']}>
                <Button sx={{
                    color: '#ffcc4d',
                    minWidth: '0px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                }}>
                    <img
                        className={`${styles['emoji-icon']} ${showPicker ? styles['emoji-icon--hidden'] : styles['emoji-icon--visible']}`}
                        src={EmojiCinza}
                        onClick={() => setShowPicker((val) => !val)}
                    />

                    <img
                        className={`${styles['emoji-icon']} ${showPicker ? styles['emoji-icon--visible'] : styles['emoji-icon--hidden']}`}
                        src={EmojiAmarelo}
                        onClick={() => setShowPicker((val) => !val)}
                    />

                    {showPicker && (
                        <div className={styles['emoticons']}>
                            <Picker i18n={i18n} onEmojiSelect={onEmojiClick} />
                        </div>
                    )}
                </Button>
                <textarea
                    ref={inputRef}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={verificarTexto}
                    placeholder="Digite sua mensagem..."
                    rows="1"
                    disabled={isLoading || isLoadingMessages}
                />

                <div className={styles['conversa-content__enviar-mensagem__arquivo']}
                    style={{
                        visibility: arquivo.tipo != null ? 'visible' : 'hidden',
                        height: arquivo.tipo == null ? '0px' : (arquivo.tipo == "imagem" ? '60vh' : '20vh'),
                    }}
                >
                    <Button onClick={() => setArquivo({})}
                        sx={
                            {
                                minWidth: '0px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                padding: '0px',
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                fontSize: '20px',
                                color: 'red'
                            }
                        }>X</Button>
                    {
                        arquivo.tipo == "imagem" &&
                        <div className={styles['conversa-content__enviar-mensagem__arquivo-imagem']}>
                            <img src={arquivo?.url} alt="" />
                        </div>
                    }

                    {
                        arquivo.tipo == "documento" &&
                        <div className={styles['conversa-content__enviar-mensagem__arquivo-documento']}>
                            <img src={DocumentImg} />
                            <div className={styles['conversa-content__enviar-mensagem__arquivo-documento__informacoes']}>
                                <div className={styles['conversa-content__enviar-mensagem__arquivo-documento__informacoes__nome']}>
                                    <p>{arquivo.file.name}</p>
                                </div>
                                <div className={styles['conversa-content__enviar-mensagem__arquivo-documento__informacoes__metadado']}>
                                    <p>{formatarBytes(arquivo.file.size)}</p>
                                    <p>{arquivo.file.type}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <MenuArquivo setArquivo={setArquivo} />

                <LoadingButton type="submit" loading={isLoading} color="primary" size="large" disabled={isLoading || isLoadingMessages} >
                    {isLoadingMessages ? "S" : "N"}
                    {(!isLoading) &&
                        <div>
                            <img src={Send} />
                        </div>
                    }
                </LoadingButton>
            </form >
        </>
    )
}

export default ConversaInput;
