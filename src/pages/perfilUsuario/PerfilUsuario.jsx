import React from "react";
import styles from "./perfilUsuario.module.css"
import Header from "../../componentes/shared/header/Header";
import BannerDescUsuario from "../../componentes/perfilUsuario/bannerDescUsuario/BannerDescUsuario";
import DescricaoUsuario from "../../componentes/perfilUsuario/descricaoUsuario/DescricaoUsuario";
import BoxSoftSkills from "../../componentes/perfilUsuario/skillsUsuario/boxSkills/BoxSoftSkills";
import BoxHardSkills from "../../componentes/perfilUsuario/skillsUsuario/boxHardSkills/BoxHardSkills";
import ComentarioPerfil from "../../componentes/perfilUsuario/comentarioPerfil/comentarioPerfil/ComentarioPerfil";
import CampoComentario from "../../componentes/perfilUsuario/comentarioPerfil/campoComentario/CampoComentario";

import { Divider } from "@mui/material";
import Carrossel from "../../componentes/shared/carrossel/Carrossel";


const PerfilUsuario = (props) => {

    let descExperiencia = '"Na minha jornada, liderei projetos desafiadores, desde aplicativos móveis para grandes marcas até sistemas de gerenciamento robustos, sempre buscando a excelência técnica e funcional."'

    let descSobreMim = 'Sou um entusiasta da tecnologia dedicado, apaixonado por resolver problemas complexos de maneira criativa. Minha busca incessante por aprendizado impulsiona meu constante crescimento na área de desenvolvimento.'

    const [comentario, setComentario] = React.useState([{
        nomeUsuario: 'TechHub',
        comentario: 'O desenvolvedor é uma verdadeira peça-chave em nossa equipe. Sempre traz soluções inovadoras e entrega resultados excepcionais. Sua habilidade de comunicação também enriquece nossa colaboração.',
        value: 3
    },
    {
        nomeUsuario: 'PlusHub',
        comentario: 'Trabalhar com esse desenvolvedor foi uma experiência incrível. Sua dedicação incansável em enfrentar desafios e sua capacidade de transformar ideias em código funcional são notáveis. Um ativo para qualquer projeto',
        value: 4
    },
    {
        nomeUsuario: 'V6',
        comentario: 'O desenvolvedor é uma verdadeira peça-chave em nossa equipe. Sempre traz soluções inovadoras e entrega resultados excepcionais. Sua habilidade de comunicação também enriquece nossa colaboração.',
        value: 4
    },
    {
        nomeUsuario: 'Simasturbo Mecânica',
        comentario: 'O desenvolvedor é uma verdadeira peça-chave em nossa equipe. Sempre traz soluções inovadoras e entrega resultados excepcionais. Sua habilidade de comunicação também enriquece nossa colaboração.',
        value: 4
    },
    ]);

    return (
        <>
            <Header />
            <div className={styles['perfil__usuario']}>
                <div className={styles['content']}>
                    <BannerDescUsuario />
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
                    <div className={styles['content__sectionProjetos']}>
                        <h1>Projetos desenvolvidos</h1>
                        <div id="lista-projetos" className={styles['content__listaProjetos']}>
                            <Carrossel />
                        </div>
                    </div>
                    <div className={styles['content__sectionComentariosAvaliacoes']}>
                        <div className={styles['sectionComentariosAvaliacoes__comentarios']}>
                            <h1>Comentários</h1>
                            {
                                comentario.map((comentario, index) => {
                                    if (index < 3) {
                                        return (
                                            <ComentarioPerfil key={`comentario${index}`} nomeUsuario={comentario.nomeUsuario} comentario={comentario.comentario} value={comentario.value} />
                                        )
                                    }
                                })
                            }
                            <CampoComentario nomeUsuario='Você' />
                        </div>
                        <Divider orientation="vertical" flexItem style={{ margin: '0 36px' }}></Divider>
                        <div className={styles['sectionComentariosAvaliacoes__avaliacoes']}>
                            <h1>Avaliações</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PerfilUsuario;