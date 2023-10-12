import { useRef, useEffect, useState } from "react";
import styles from "./conversaMensagem.module.css";
import moment from "moment-timezone";
import DownloadImg from '../../../../assets/images/icons/download.svg';
import axiosInstance from "../../../../config/axiosInstance";
import { formatarBytes } from '../../../../utils/geral';


const ConversaMensagem = (props) => {
    const mensagem = props.mensagem;
    const index = props.index;
    const mensagens = props.mensagens;
    const usuarioId = props.usuarioId;
    const imagemCarregada = props.imagemCarregada;

    const imageRef = useRef(null);
    const docRef = useRef(null);
    const [infoArquivo, setInfoArquivo] = useState({});


    useEffect(() => {
        if (mensagem.tipoArquivo == "IMAGEM") {
            carregarImagem();
        }
        if (mensagem.tipoArquivo == "DOCUMENTO") {
            carregarDocumento();
        }
    }, []);

    const carregarImagem = () => {
        axiosInstance.get(`/arquivos${mensagem.urlArquivo}`, {
            responseType: 'blob'
        })
            .then((response) => {
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                imageRef.current.src = fileURL;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const carregarDocumento = () => {
        axiosInstance.get(`/arquivos${mensagem.urlArquivo}`,
            {
                responseType: 'blob'
            })
            .then((response) => {
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                docRef.current.href = fileURL;
                const nomeArquivo = response.headers['content-disposition']
                    .split('filename=')[1]
                    .replace(/\"/g, '');

                docRef.current.download = nomeArquivo;

                console.log(response.headers);
                setInfoArquivo({
                    nomeArquivo: nomeArquivo,
                    tamanhoArquivo: response.headers['content-length'],
                    tipoArquivo: response.headers['content-type']
                })


                // Extracting and using size from headers
                const size = response.headers['file-size'];
                console.log('File size:', size);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        mensagem.id == -1 ?
            <div className={styles['conversa-content__mensagem--data']}>
                <p>{mensagem.texto}</p>
            </div>
            :
            <div className={
                `${styles['conversa-content__mensagem']} 
                ${mensagem.urlArquivo ? styles['conversa-content__mensagem--arquivo'] : ""}
                        ${(mensagem.usuarioId == usuarioId ? styles['conversa-content__mensagem--propria'] : "")}`
            }
            >
                {
                    mensagem.urlArquivo && mensagem.tipoArquivo == "IMAGEM" &&
                    <div className={styles['conversa-content__mensagem__info__imagem']}>
                        <img
                            ref={imageRef}
                            onLoad={() => imagemCarregada(index, mensagens.length)}
                        />
                    </div>
                }

                {
                    mensagem.urlArquivo && mensagem.tipoArquivo == "DOCUMENTO" &&
                    <a target="_blank" ref={docRef} className={styles['conversa-content__mensagem__info__arquivo']}>
                        <img src={DownloadImg} />
                        <div className={styles['conversa-content__mensagem__info__arquivo__informacoes']}>
                            <div className={styles['conversa-content__mensagem__info__arquivo__informacoes__nome']}>
                                <p>{infoArquivo.nomeArquivo}</p>
                            </div>
                            <div className={styles['conversa-content__mensagem__info__arquivo__informacoes__metadado']}>
                                <p>{formatarBytes(infoArquivo.tamanhoArquivo)}</p>
                                <p>{infoArquivo.tipoArquivo}</p>
                            </div>
                        </div>
                    </a>
                }

                <div className={styles['conversa-content__mensagem__info__texto']}>
                    <p>{mensagem.texto}</p>
                </div>
                <div className={styles['conversa-content__mensagem__info__white-space']}>
                </div>
                <div className={styles['conversa-content__mensagem__info__data']}>
                    <p>{moment(mensagem.dtHora).tz("America/Sao_Paulo").format("HH:mm")}</p>
                </div>
            </div>
    )
}

export default ConversaMensagem;