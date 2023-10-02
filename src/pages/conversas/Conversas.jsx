import styles from './conversas.module.css'
import ListaDeConversas from './ListaDeConversa/ListaDeConversa'
import ConversaContent from './conversaContent/ConversaContent'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import chatDefaultImg from '../../assets/images/chat-default.png';

let socketConectado = false;

const Conversas = () => {
    const usuarioId = sessionStorage.getItem('usuarioId');
    const location = useLocation();

    const [stompClient, setStompClient] = useState(null);
    const [conversas, setConversas] = useState([]);
    const [conversaSelecionada, setConversaSelecionada] = useState(null);

    useEffect(() => {

        if (location.state?.usuario) {
            const conversa = {
                usuario: {
                    id: location.state.usuario.id,
                    nome: location.state.usuario.nome,
                    pathPerfilImage: location.state.usuario.perfil?.pathPerfilImage
                },
                idPrimeiraConversa: location.state.usuario.id
            }
            setConversaSelecionada(conversa);
        }

        carregarConversas();

        return () => {
            if (!stompClient) return;
            stompClient.disconnect();
            socketConectado = false;
        }

    }, []);

    const onConnect = (stompClient) => {
        stompClient.subscribe(`/topic/usuario/${usuarioId}`, () => {
            carregarConversas();
        })

        setStompClient(stompClient);
    }

    const onError = (err) => {
        console.log("Erro ao conectar com o WebSocket");
        console.log(err);
    }

    const conectarWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/websocket');
        let server = over(socket);
        // Log de mensagens
        // server.debug = null


        server.connect({}, () => onConnect(server), onError);
    }

    const carregarConversas = () => {
        axiosInstance.get(`/conversas`)
            .then((response) => {
                const conversasResponse = response.data;
                if (response.status == 200) {
                    setConversas(conversasResponse);
                }
                if (!socketConectado) {
                    conectarWebSocket(conversasResponse);
                    socketConectado = true;
                };
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={styles['content']}>
            <div className={styles['header']}></div>
            <div className={styles['conversas']}>
                <ListaDeConversas
                    conversas={conversas}
                    setConversaSelecionada={setConversaSelecionada}
                    conversaSelecionada={conversaSelecionada}
                />
                {
                    conversaSelecionada ?
                        <ConversaContent
                            conversaSelecionada={conversaSelecionada}
                            setConversaSelecionada={setConversaSelecionada}
                            stompClient={stompClient}
                        />
                        :
                        <div className={styles['conversa-default']}>
                            <img src={chatDefaultImg} alt="Chat default" />
                            <p>Selecione uma <span>conversa</span> para começar!</p>
                        </div>
                }

            </div>
        </div>
    )
}

export default Conversas;