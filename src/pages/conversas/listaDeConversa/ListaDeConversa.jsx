import styles from './listaDeConversa.module.css'
import moment from 'moment-timezone';
import { Avatar } from '@mui/material'

const ListaDeConversa = (props) => {
    const { conversas, setConversaSelecionada, conversaSelecionada } = props;

    return (
        <>
            <div className={styles['lista-de-conversa']}>
                <div className={styles['lista-de-conversa__header']}>
                    <h2>Conversas</h2>
                </div>
                <div className={styles['lista-de-conversa__conversas']}>
                    {conversas.map((conversa, index) => {
                        return (
                            <div
                                key={"conversa" + index}
                                className={
                                    styles['lista-de-conversa__conversa'] +
                                    " " +
                                    (conversaSelecionada?.roomCode == conversa.roomCode ? styles['lista-de-conversa__conversa--selecionada'] : "")
                                }
                                onClick={() => setConversaSelecionada(conversa)}
                            >
                                <div className={styles['lista-de-conversa__conversa__foto']}>
                                    {
                                        conversa.usuario.foto ?
                                            <img src={conversa.usuario?.pathPerfilImage} />
                                            :

                                            <Avatar src="/broken-image.jpg" />
                                    }
                                </div>
                                <div className={styles['lista-de-conversa__conversa__info']}>
                                    <div className={styles['lista-de-conversa__conversa__info__nome']}>
                                        <p>{conversa.usuario?.nome}</p>
                                    </div>
                                    <div className={styles['lista-de-conversa__conversa__info__mensagem']}>
                                        <p>{conversa.mensagem?.texto}</p>
                                    </div>
                                </div>
                                <div className={styles['lista-de-conversa__conversa__info__data']}>
                                    <p>{moment(conversa.mensagem?.dtHora).format("HH:mm")}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ListaDeConversa;