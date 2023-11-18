import React from "react";
import styles from "./perfilUsuario.module.css"
import Header from "../../componentes/shared/header/Header";
import BannerDescUsuario from "../../componentes/perfilUsuario/bannerDescUsuario/BannerDescUsuario";
import DescricaoUsuario from "../../componentes/perfilUsuario/descricaoUsuario/DescricaoUsuario";
import BoxSoftSkills from "../../componentes/perfilUsuario/skillsUsuario/boxSkills/BoxSoftSkills";
import ComentarioPerfil from "../../componentes/perfilUsuario/comentarioPerfil/comentarioPerfil/ComentarioPerfil";
import CampoComentario from "../../componentes/perfilUsuario/comentarioPerfil/campoComentario/CampoComentario";

import { Box, Button, Divider, Rating } from "@mui/material";
import AvaliacoesUsuario from "../../componentes/perfilUsuario/avaliacoesUsuario/AvaliacoesUsuario";
import styled from "@emotion/styled";
import Projetos from "../../componentes/perfilUsuario/projetosUsuario/Projetos";
import axiosInstance from "../../config/axiosInstance";
import WidgetSoftSkill from "../../componentes/perfilUsuario/skillsUsuario/widgetSoftSkill/WidgetSoftSkill";
import WidgetHardSkills from "../../componentes/perfilUsuario/skillsUsuario/widgetHardSkills/WidgetHardSkills";
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from "../notFound/NotFound";
import PerfilSkeleton from "../../componentes/perfilUsuario/PerfilSkeleton/PerfilSkeleton";
import InfoAdicional from "../../componentes/perfilUsuario/infoAdicional/InfoAdicional";

const PerfilUsuario = (props) => {

    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isNotFound, setIsNotFound] = React.useState(false);

    const [usuario, setUsuario] = React.useState([]);
    const [avaliacao, setAvaliacao] = React.useState([])
    const [totalAvaliacoes, setTotalAvaliacoes] = React.useState([]);
    const [mediaEstrelas, setMediaEstrelas] = React.useState(0);

    const searchParams = new URLSearchParams(location.search);
    const usuarioParamId = searchParams.get('id');
    const usuarioLogadoId = sessionStorage.getItem('usuarioId');
    const isOwnProfile = !usuarioParamId || (usuarioParamId == usuarioLogadoId)
    const [idRequisicao, setIdRequisicao] = React.useState(0);



    React.useEffect(() => {

        setIdRequisicao(isOwnProfile ? usuarioLogadoId : usuarioParamId);
    }, []);

    const carregarPerfil = () => {
        setIsLoading(true);

        axiosInstance.get('/perfis/' + idRequisicao)
            .then((response) => {
                if (response.status == 200) {
                    const usuarioPerfil = response.data
                    usuarioPerfil.isOwnProfile = isOwnProfile;
                    usuarioPerfil.isPerfilFreelancer = usuarioPerfil.funcao == 'FREELANCER';

                    let softSkillsUsuario = [];
                    let hardSkillsUsuario = [];
            
                    const usuarioFlags = usuarioPerfil.flags;
            
                    for (let i = 0; i < usuarioFlags.length; i++) {
                        if (usuarioFlags[i].categoria === "soft-skill") {
                            softSkillsUsuario.push(usuarioFlags[i]);
                        } else if (usuarioFlags[i].categoria === "hard-skill") {
                            hardSkillsUsuario.push(usuarioFlags[i]);
                        }
                    }

                    usuarioPerfil.softSkills = softSkillsUsuario;
                    usuarioPerfil.hardSkills = hardSkillsUsuario;

                    setUsuario(usuarioPerfil);
                    carregarAvaliacaoGeral();
                }
            })
            .catch((error) => {
                if (error.response.status == 404) {
                    setIsNotFound(true);
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const carregarAvaliacaoGeral = () => {
        axiosInstance.get('/perfis/avaliacao/geral/' + idRequisicao)
            .then((response) => {
                if (response.status == 200) {
                    const usuarioAvaliacao = response.data;

                    // use reduce() method to find the sum
                    let sum = usuarioAvaliacao.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.quantidade
                    }, 0);

                    setTotalAvaliacoes(sum);

                    for (var i = 1; i <= 5; i++) {
                        if (!usuarioAvaliacao.some(avaliacao => avaliacao.qtdEstrela == i)) {
                            usuarioAvaliacao.push({ qtdEstrela: i, quantidade: 0 });
                        }
                    }

                    usuarioAvaliacao.forEach(usuario => {
                        usuario.porcentagem = ((usuario.quantidade / sum) * 100).toFixed(0)
                    });

                    usuarioAvaliacao.sort((a, b) => {
                        if (a.qtdEstrela > b.qtdEstrela) {
                            return -1
                        } else {
                            return 1
                        }
                    })

                    let media = 0;
                    usuarioAvaliacao.forEach(usuario => {
                        media += (usuario.qtdEstrela * usuario.quantidade)
                    });


                    setMediaEstrelas(Math.round(media / sum))

                    setAvaliacao(usuarioAvaliacao);
                }
            })
    }

    const [flags, setFlags] = React.useState([]);

    React.useEffect(() => {

        const newSkills = usuario?.flags?.map((flag) => {
            // map varre a lista e transforma o json antigo em um novo

            let background;

            switch (flag.area) {

                case 'front-end':
                    background = "var(--color-frontend)"
                    break;
                case 'back-end':
                    background = "var(--color-backend)"
                    break;
                case 'mobile':
                    background = "var(--color-mobile)";
                    break;
                case 'banco de dados':
                    background = "var(--color-database)";
                    break;
                case 'testes':
                    background = "var(--color-testes)";
                    break;
                case 'análise de dados':
                    background = "var(--color-analiseDados)";
                    break;
                case 'devops':
                    background = "var(--color-devops)";
                    break;
                case 'I.A.':
                    background = "var(--color-ia)";
                    break;
                case 'segurança':
                    background = "var(--color-seguranca)";
                    break;
            }


            return {
                ...flag, // Pega todos os atributos do json que já existem.
                background // adiciona novo atributo com base na variável background
            }
        })

        setFlags(newSkills);
    }, [usuario])

    React.useEffect(() => {
        if (idRequisicao == 0) {
            return
        }

        carregarPerfil();
        trazerComentarios(0, idRequisicao);

    }, [idRequisicao])

    const [paginas, setPaginas] = React.useState(1)
    const [comentario, setComentario] = React.useState([]);
    const [comentariosFim, setComentariosFim] = React.useState(false)

    const verMais = () => {
        setPaginas(paginas + 1)
        trazerComentarios(paginas, idRequisicao)
    }

    const trazerComentarios = (paginas, idRequisicao) => {
        axiosInstance.get(`/perfis/avaliacao/${idRequisicao}?page=${paginas}&size=3&sort=id,desc`)
            .then((response) => {
                if (!response.data.content) return setComentariosFim(true);

                setComentario(prev => {
                    if (!prev || paginas == 0) {
                        return response.data.content
                    }
                    return [
                        ...prev,
                        ...response.data.content
                    ]
                })
            })
    }


    return (
        <>
            {
                isLoading ?
                    <PerfilSkeleton />
                    :
                    isNotFound ?
                        <NotFound />
                        :
                        <>
                            <Header />
                            <div className={styles['perfil__usuario']}>
                                <div className={styles['content']}>
                                    <BannerDescUsuario usuario={usuario} setUsuario={setUsuario} carregarPerfil={carregarPerfil} />
                                    {
                                        usuario.isPerfilFreelancer ?
                                            <div className={styles['content__sectionSkills']}>
                                                <div className={styles['sectionSkills__experiencia']}>
                                                    <DescricaoUsuario titulo='Experiência' texto={usuario.experiencia} />
                                                    <Divider variant="middle" style={{ margin: '16px 0' }} />
                                                    <DescricaoUsuario titulo='Sobre mim' texto={usuario.sobreMim} />
                                                </div>
                                                <div className={styles['sectionSkills__experiencia']}>
                                                    <h1 className={styles['titulo']}>Soft Skills</h1>
                                                    <div className={styles['boxSkills']}>
                                                        {
                                                            flags?.filter(flags => flags.categoria === "soft-skill")?.map((flags) => {
                                                                return (
                                                                    <WidgetSoftSkill key={flags.nome} softSkill={flags.nome} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {/* <BoxSoftSkills /> */}
                                                    <Divider variant="middle" style={{ margin: '16px 0' }} />
                                                    <h1 className={styles['titulo']}>Hard Skill</h1>
                                                    <div className={styles['boxSkills']}>
                                                        {
                                                            flags?.filter(flags => flags.categoria === "hard-skill")?.map((flags) => {
                                                                return (
                                                                    <WidgetHardSkills key={flags.nome} hardSkill={flags.nome} background={flags.background} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {/* <BoxHardSkills /> */}
                                                </div>
                                            </div>
                                            :
                                            <div className={styles['content__sectionSkillsEmpresa']}>
                                                <div className={styles['sectionSkillsEmpresa__experiencia']}>
                                                    <div className={styles['sectionSkills__sobreNos']}>
                                                        <DescricaoUsuario titulo='Experiência' texto={usuario.experiencia} />
                                                    </div>
                                                    <div className={styles['sectionSkills__quemProcuramos']}>
                                                        <DescricaoUsuario titulo='Quem procuramos' texto={usuario.sobreMim} />
                                                    </div>
                                                </div>
                                                <div className={styles['sectionSkills__softSkills']}>
                                                    <BoxSoftSkills skills={ flags?.filter(flag => flag.categoria === "soft-skill") } />
                                                </div>
                                            </div>
                                    }
                                    {
                                        usuario.isPerfilFreelancer &&
                                        <div className={styles['content__sectionProjetos']}>
                                            <Projetos nomeGitHub={usuario.nomeGitHub} />
                                        </div>
                                    }
                                    <div className={styles['content__sectionComentariosAvaliacoes']}>
                                        <div className={styles['sectionComentariosAvaliacoes__comentarios']}>
                                            <h1>Comentários</h1>
                                            {
                                                comentario.length == 0 &&
                                                <p
                                                style={{color: '#B4B4B4', marginTop: '24px',marginBottom: '24px',  fontWeight: '500'}}
                                                >Este usuário ainda não possui comentários.</p>
                                            }
                                            {
                                                comentario.map((comentario, index) => {
                                                    return (
                                                        <ComentarioPerfil
                                                            key={`comentario${index}`}
                                                            comentario={comentario}
                                                        />
                                                    )
                                                })
                                            }
                                            {!comentariosFim && comentario.length >= 3 &&
                                                <Button style={{ color: 'var(--color-cinza)', marginBottom: '32px', fontWeight: '500' }} onClick={verMais}>Ver mais</Button>
                                            }
                                            {!usuario.isOwnProfile &&
                                                <CampoComentario
                                                    idRequisicao={idRequisicao}
                                                    carregarAvaliacaoGeral={carregarAvaliacaoGeral}
                                                    trazerComentarios={trazerComentarios}
                                                    setComentario={setComentario}
                                                    nomeUsuario='Você'
                                                />
                                            }
                                        </div>
                                        <Divider orientation="vertical" flexItem style={{ margin: '0 36px' }}></Divider>
                                        <div className={styles['sectionComentariosAvaliacoes__avaliacoes']}>
                                            <AvaliacoesUsuario
                                                avaliacao={avaliacao}
                                                totalAvaliacoes={totalAvaliacoes}
                                                mediaEstrelas={mediaEstrelas}
                                            />
                                            <Divider variant="middle" style={{ width: '100%', margin: '40px 0' }} />
                                            <InfoAdicional usuario={usuario} setUsuario={setUsuario} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </>
    );
}

export default PerfilUsuario;
