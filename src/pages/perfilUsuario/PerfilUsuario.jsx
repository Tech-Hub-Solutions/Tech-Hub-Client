import React from "react";
import styles from "./perfilUsuario.module.css"
import Header from "../../componentes/shared/header/Header";
import BannerDescUsuario from "../../componentes/perfilUsuario/bannerDescUsuario/BannerDescUsuario";
import DescricaoUsuario from "../../componentes/perfilUsuario/descricaoUsuario/DescricaoUsuario";
import BoxSoftSkills from "../../componentes/perfilUsuario/skillsUsuario/boxSkills/BoxSoftSkills";
import BoxHardSkills from "../../componentes/perfilUsuario/skillsUsuario/boxHardSkills/BoxHardSkills";
import ComentarioPerfil from "../../componentes/perfilUsuario/comentarioPerfil/comentarioPerfil/ComentarioPerfil";
import CampoComentario from "../../componentes/perfilUsuario/comentarioPerfil/campoComentario/CampoComentario";

import { Box, Button, Divider, Rating } from "@mui/material";
import Carrossel from "../../componentes/shared/carrossel/Carrossel";
import AvaliacoesUsuario from "../../componentes/perfilUsuario/avaliacoesUsuario/AvaliacoesUsuario";
import styled from "@emotion/styled";
import Projetos from "../../componentes/perfilUsuario/projetosUsuario/Projetos";
import axiosInstance from "../../config/axiosInstance";


const PerfilUsuario = (props) => {

    // const [usuario, setUsuario] = React.useState([]);

    // React.useEffect(() => {
    //     axiosInstance.get('/perfil-usuario')
    //         .then((response) => {
    //             if (response.status == 200) {
    //                 const usuario = response.data;

    //                 // trazerComentarios(1)
    //             }
    //         })

    // }, []);

    // const [paginas, setPaginas] = react.useState(1)

    // const trazerComentarios = (pagina) => {
    //     axios.get(`/perfil/comentarios?page=${pagina}`)
    //         .then((response) => {
    //             setComentario(prev => [
    //                 ...prev,
    //                 response.data
    //             ])
    //         })
    // }

    // Button "Ver mais"

    // const verMais = () => {
    //     trazerComentarios(paginas + 1)
    //     setPaginas(paginas + 1)
    // }

    const isPerfilFreelancer = true;

    let descExperiencia = '"Na minha jornada, liderei projetos desafiadores, desde aplicativos móveis para grandes marcas até sistemas de gerenciamento robustos, sempre buscando a excelência técnica e funcional."'
    let descSobreMim = 'Sou um entusiasta da tecnologia dedicado, apaixonado por resolver problemas complexos de maneira criativa. Minha busca incessante por aprendizado impulsiona meu constante crescimento na área de desenvolvimento.'


    const [comentario, setComentario] = React.useState([{
        nomeUsuario: 'TechHub',
        comentario: 'O desenvolvedor é uma verdadeira peça-chave em nossa equipe. Sempre traz soluções inovadoras e entrega resultados excepcionais. Sua habilidade de comunicação também enriquece nossa colaboração.',
        value: 3
    },
    {
        nomeUsuario: 'PlusHub',
        comentario: 'Minha experiência de trabalho com Bruno foi desapontadora. Embora tenhamos tido expectativas iniciais positivas, o resultado final do projeto não atendeu às nossas necessidades. Houve problemas de comunicação, atrasos recorrentes e, infelizmente, a qualidade do trabalho entregue ficou aquém do que esperávamos. Esperávamos mais profissionalismo e um compromisso mais forte com a excelência.',
        value: 2
    },
    {
        nomeUsuario: 'V6',
        comentario: 'Trabalhar com Bruno foi uma experiência excepcional. Sua expertise em tecnologia e dedicação à excelência tornaram nosso projeto um grande sucesso. Bruno é um profissional notável e estamos ansiosos para futuras colaborações. Altamente recomendado!',
        value: 4
    },
    // {
    //     nomeUsuario: 'Tech Masters',
    //     comentario: 'Bruno é simplesmente brilhante na área de tecnologia. Seu trabalho no nosso projeto superou todas as expectativas. Profissional, competente e confiável, Bruno é a escolha certa para qualquer desafio tecnológico. Mal posso esperar para trabalharmos juntos novamente!',
    //     value: 4
    // },
    ]);

    // Seção de Avaliações

    const valorPerfil = 3;
    const avaliacoesRealizadas = 59;

    const [avaliacao, setAvaliacao] = React.useState([{
        estrelas: 5,
        numeroAvaliacoes: 50,
        porcentagem: 68,
    },
    {
        estrelas: 4,
        numeroAvaliacoes: 21,
        porcentagem: 20,
    },
    {
        estrelas: 3,
        numeroAvaliacoes: 5,
        porcentagem: 6,
    },
    {
        estrelas: 2,
        numeroAvaliacoes: 2,
        porcentagem: 4,
    },
    {
        estrelas: 1,
        numeroAvaliacoes: 0,
        porcentagem: 0,
    },])

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
                    <BannerDescUsuario />
                    {
                        isPerfilFreelancer ?
                            <div className={styles['content__sectionSkills']}>
                                <div className={styles['sectionSkills__experiencia']}>
                                    <DescricaoUsuario titulo='Experiência' texto={descExperiencia} />
                                    <Divider variant="middle" style={{ margin: '16px 0' }} />
                                    <DescricaoUsuario titulo='Sobre mim' texto={descSobreMim} />
                                </div>
                                <div className={styles['sectionSkills__experiencia']}>
                                    <BoxSoftSkills />
                                    <Divider variant="middle" style={{ margin: '16px 0' }} />
                                    <BoxHardSkills />
                                </div>
                            </div>
                            :
                            <div className={styles['content__sectionSkillsEmpresa']}>
                                <div className={styles['sectionSkillsEmpresa__experiencia']}>
                                    <div className={styles['sectionSkills__sobreNos']}>
                                        <DescricaoUsuario titulo='Experiência' texto={descExperiencia} />
                                    </div>
                                    <div className={styles['sectionSkills__quemProcuramos']}>
                                        <DescricaoUsuario titulo='Sobre mim' texto={descSobreMim} />
                                    </div>
                                </div>
                                <div className={styles['sectionSkills__softSkills']}>
                                    <BoxSoftSkills />
                                </div>
                            </div>
                    }
                    {
                        isPerfilFreelancer &&
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
                                        <ComentarioPerfil key={`comentario${index}`} nomeUsuario={comentario.nomeUsuario} comentario={comentario.comentario} value={comentario.value} />
                                    )
                                })
                            }
                            <Button style={{ color: 'var(--color-cinza)', marginBottom: '32px', fontWeight: '500' }}>Ver mais</Button>
                            <CampoComentario nomeUsuario='Você' />
                        </div>
                        <Divider orientation="vertical" flexItem style={{ margin: '0 36px' }}></Divider>
                        <div className={styles['sectionComentariosAvaliacoes__avaliacoes']}>
                            <h1>Avaliações</h1>
                            <div className={styles['avaliacoesUsuario']}>
                                <div className={styles['avaliacoesUsuario__titulo']}>
                                    <h2>{avaliacoesRealizadas} avaliações realizadas</h2>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2 },
                                        }}
                                    >
                                        <Rating name="read-only" value={valorPerfil} readOnly />
                                    </Box>
                                </div>
                                {
                                    avaliacao.map((avaliacao) => {
                                        return (
                                            <AvaliacoesUsuario key={`avaliacao${avaliacao.estrelas}`} numeroEstrelas={avaliacao.estrelas} value={avaliacao.porcentagem} numeroAvaliacoes={avaliacao.numeroAvaliacoes} />
                                        )
                                    })
                                }
                            </div>
                            <Divider variant="middle" style={{ width: '100%', margin: '40px 0' }} />
                            <div className={styles['sectionComentariosAvaliacoes__adicionais']}>
                                <h1>Informações adicionais</h1>
                                {
                                    isPerfilFreelancer ?
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