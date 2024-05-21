import styles from './conversas.module.css'
import ListaDeConversas from '../../componentes/Conversas/listaDeConversa/ListaDeConversa'
import ConversaContent from '../../componentes/Conversas/conversaContent/ConversaContent'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import chatDefaultImg from '../../assets/images/chat-default.png';
import Header from '../../componentes/shared/header/Header';
import ListaDeConversaSkeleton from '../../componentes/Conversas/listaDeConversa/ListaDeConversaSkeleton';
import ConversaContentSkeleton from '../../componentes/Conversas/conversaContent/ConversaContentSkeleton';

const Conversas = () => {
    const usuarioId = localStorage.getItem('usuarioId');
    const location = useLocation();
    const [stompClient, setStompClient] = useState(null);

    const [conversas, setConversas] = useState([]);
    const [conversaSelecionada, setConversaSelecionada] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sock = new SockJS(`${import.meta.env.VITE_SERVICES_BASE_URL}` + "/websocket");
        const stomp = over(sock);
        stomp.debug = () => { };

        setStompClient(stomp);

    }, []);

    useEffect(() => {
        stompClient?.connect(onError, () => {
            carregarConversas();
            stompClient.subscribe(`/topic/usuario/${usuarioId}`, () => {
                carregarConversas();
            });
        });

        return () => {
            if (stompClient?.connected) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);


    const onError = (err) => {
        alert('Erro ao conectar com o servidor');
        console.log(err);
    }

    const carregarConversas = () => {
        axiosInstance.get(`/conversas`)
            .then((response) => {
                const conversasResponse = response.data;
                if (response.status == 200) {
                    setConversas(conversasResponse);
                }

                if (conversaSelecionada == null || conversasResponse.length <= 0) {
                    if (location.state?.usuario) {
                        let conversa;
                        if (response.data.length > 0) {
                            conversa = conversasResponse.find((conversa) => conversa.usuario.id == location.state.usuario.id);
                        }
                        if (conversa) {
                            setConversaSelecionada(conversa);
                        } else {
                            const conversa = {
                                usuario: {
                                    id: location.state.usuario.id,
                                    nome: location.state.usuario.nome,
                                    urlFotoPerfil: location.state.usuario?.urlFotoPerfil
                                },
                                idPrimeiraConversa: location.state.usuario.id
                            }
                            setConversaSelecionada(conversa);
                        }
                        window.history.replaceState({}, document.title)
                    }
                }
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className={styles['content']}>
            <Header />
            {
                isLoading ?
                    <div className={styles['conversas']}>
                        <ListaDeConversaSkeleton />
                        <ConversaContentSkeleton />
                    </div>

                    :
                    <div className={styles['conversas']}>
                        <ListaDeConversas
                            conversas={conversas}
                            setConversaSelecionada={setConversaSelecionada}
                            conversaSelecionada={conversaSelecionada}
                        />
                        {conversaSelecionada ?
                            <ConversaContent
                                conversaSelecionada={conversaSelecionada}
                                setConversaSelecionada={setConversaSelecionada}
                                stompClient={stompClient}
                            />
                            :
                            <div className={styles['conversa-default']}>
                                <img src={chatDefaultImg} alt="Chat default" />
                                <p>Selecione uma <span>conversa</span> para começar!</p>
                            </div>}
                    </div>

            }

        </div>
    )
}

export default Conversas;
