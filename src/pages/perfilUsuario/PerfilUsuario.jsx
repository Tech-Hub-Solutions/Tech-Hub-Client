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
import { useLocation } from 'react-router-dom'

const PerfilUsuario = (props) => {

    const [usuario, setUsuario] = React.useState([]);
    const [avaliacao, setAvaliacao] = React.useState([])
    const [totalAvaliacoes, setTotalAvaliacoes] = React.useState([]);
    const [mediaEstrelas, setMediaEstrelas] = React.useState(0);
    const [idRequisicao, setIdRequisicao] = React.useState(0);
    const location = useLocation();

    React.useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const usuarioParamId = searchParams.get('id');

        const usuarioLogadoId = sessionStorage.getItem('usuarioId');

        let idRequisicao;

        const isOwnProfile = !usuarioParamId || (usuarioParamId == usuarioLogadoId)

        if (isOwnProfile) {
            idRequisicao = usuarioLogadoId;
        } else {
            idRequisicao = usuarioParamId;
        }

        setIdRequisicao(idRequisicao);

        axiosInstance.get('/perfis/' + idRequisicao)
            .then((response) => {
                if (response.status == 200) {
                    const usuarioPerfil = response.data
                    usuarioPerfil.isOwnProfile = isOwnProfile;
                    usuarioPerfil.isPerfilFreelancer = usuarioPerfil.funcao == 'FREELANCER';

                    setUsuario(usuarioPerfil);

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
            })
    }, []);

    // const totalAvaliacoes 

    const [flags, setFlags] = React.useState([]);

    React.useEffect(() => {

        const newSkills = usuario?.flags?.map((flags) => {
            // map varre a lista e transforma o json antigo em um novo

            let background;

            switch (flags.area) {

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
                ...flags, // Pega todos os atributos do json que já existem.
                background // adiciona novo atributo com base na variável background
            }
        })

        setFlags(newSkills);
    }, [usuario])

    React.useEffect(() => {
        if (idRequisicao == 0) {
            return
        }
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
        axiosInstance.get(`/perfis/avaliacao/${idRequisicao}?page=${paginas}&size=3`)
            .then((response) => {
                if (!response.data.content) return setComentariosFim(true);

                setComentario(prev => {
                    if (!prev) {
                        return response.data.content
                    }
                    return [
                        ...prev,
                        ...response.data.content
                    ]
                })
            })
    }


    // Seção de recomendações 

    const ButtonExplorarTalentos = styled(Button)({
        fontFamily: "Montserrat, sans-serif",
        padding: "4px 16px",
        borderRadius: "6px",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: "transparent",
        color: "#0f9eea",
        border: "2px solid #0F9EEA",
        marginTop: "8px"
    });

    return (
        <>
            <Header />
            <div className={styles['perfil__usuario']}>
                <div className={styles['content']}>
                    <BannerDescUsuario usuario={usuario} />
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
                                    <BoxSoftSkills />
                                </div>
                            </div>
                    }
                    {
                        usuario.isPerfilFreelancer &&
                        <div className={styles['content__sectionProjetos']}>
                            {/* <h1>Projetos desenvolvidos</h1>
                      <div id="lista-projetos" className={styles['content__listaProjetos']}>
                          <Carrossel />
                      </div> */}
                            <Projetos />
                        </div>
                    }
                    <div className={styles['content__sectionComentariosAvaliacoes']}>
                        <div className={styles['sectionComentariosAvaliacoes__comentarios']}>
                            <h1>Comentários</h1>
                            {
                                comentario.map((comentario, index) => {
                                    return (
                                        <ComentarioPerfil key={`comentario${index}`} nomeUsuario='hahaha' comentario={comentario.comentario} value={comentario.qtdEstrela} />
                                    )
                                })
                            }
                            {!comentariosFim && comentario.length >= 3 &&
                                <Button style={{ color: 'var(--color-cinza)', marginBottom: '32px', fontWeight: '500' }} onClick={verMais}>Ver mais</Button>
                            }
                            {!usuario.isOwnProfile &&
                                <CampoComentario idRequisicao={idRequisicao} setComentario={setComentario} nomeUsuario='Você' />
                            }
                        </div>
                        <Divider orientation="vertical" flexItem style={{ margin: '0 36px' }}></Divider>
                        <div className={styles['sectionComentariosAvaliacoes__avaliacoes']}>
                            <h1>Avaliações</h1>
                            <div className={styles['avaliacoesUsuario']}>
                                <div className={styles['avaliacoesUsuario__titulo']}>
                                    <h2>{totalAvaliacoes} avaliações realizadas</h2>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2 },
                                        }}
                                    >
                                        <Rating name="read-only" value={mediaEstrelas} readOnly />
                                    </Box>
                                </div>
                                {avaliacao.map((avaliacao) => {
                                    return (
                                        <AvaliacoesUsuario key={`qtdEstrelas${avaliacao.qtdEstrela}`} qtdEstrelas={avaliacao.qtdEstrela} numeroAvaliacoes={avaliacao.quantidade} value={avaliacao.porcentagem} />
                                    )
                                })
                                }
                            </div>
                            <Divider variant="middle" style={{ width: '100%', margin: '40px 0' }} />
                            <div className={styles['sectionComentariosAvaliacoes__adicionais']}>
                                <h1>Informações adicionais</h1>
                                {
                                    usuario.isPerfilFreelancer ?
                                        <>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4></h4>
                                                <p>Projetos finalizados</p>
                                            </div>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4>4</h4>
                                                <p>Empresas interessadas</p>
                                            </div>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4>44</h4>
                                                <p>Recomendações</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4>7</h4>
                                                <p>Projetos finalizados</p>
                                            </div>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4>4</h4>
                                                <p>Freelancers contratados</p>
                                            </div>
                                            <div className={styles['adicionais__informacoes']}>
                                                <h4>44</h4>
                                                <p>Recomendações</p>
                                            </div>
                                        </>

                                }
                                <ButtonExplorarTalentos>Recomendar</ButtonExplorarTalentos>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PerfilUsuario;