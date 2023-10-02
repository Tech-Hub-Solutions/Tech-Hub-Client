import Picker from "@emoji-mart/react";
import i18n from '@emoji-mart/data/i18n/pt.json'
import { useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import styles from './conversaInput.module.css'
import Send from '../../../../assets/images/icons/send.svg'
import EmojiCinza from '../../../../assets/images/icons/emoji-cinza.svg'
import EmojiAmarelo from '../../../../assets/images/icons/emoji-amarelo.svg'

const ConversaInput = (props) => {
    const [texto, setTexto] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const { conversaSelecionada, setConversaSelecionada, inputRef } = props;


    const verificarTexto = (event) => {
        const input = event.target;
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';

        // Se for enter, mas não estiver pressionando shift, envia a mensagem
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();

            enviarMensagem(event);
        }

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


    const enviarMensagem = () => {
        inputRef.current.style.height = 'auto';
        setShowPicker(false);
        if (!texto || texto.trim() === '') {
            return;
        }
        if (conversaSelecionada?.idPrimeiraConversa) {
            iniciarConversa();
        } else {
            postarMensagem();
        }
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


    return (
        <form onSubmit={enviarMensagem} className={styles['conversa-content__enviar-mensagem']}>
            <div className={styles['conversa-content__enviar-emoticons']}>
                <img
                    className={styles['emoji-icon']}
                    src={showPicker ? EmojiAmarelo : EmojiCinza}
                    onClick={() => setShowPicker((val) => !val)}
                />

                {showPicker && (
                    <div className={styles['emoticons']}>
                        <Picker i18n={i18n} onEmojiSelect={onEmojiClick} />
                    </div>
                )}
            </div>
            <textarea
                ref={inputRef}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={verificarTexto}
                placeholder="Digite sua mensagem..."
                rows="1"
            />

            <button className={styles['conversa-content__enviar-mensagem__botao']} >
                <img src={Send} />
            </button>
        </form>
    )
}

export default ConversaInput;