import React from "react";
import styles from "./bannerDescUsuario.module.css"
import styled from "@emotion/styled";
import { Avatar, Checkbox } from "@mui/material";
import { Button } from "@mui/material";

import LinkedinImg from "../../../assets/images/LinkedinImg.svg"
import GitHubImg from "../../../assets/images/GithubImg.svg"
import ReactCountryFlag from "react-country-flag";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";


const BannerDescUsuario = (props) => {

    const usuario = props.usuario;

    const ButtonExplorarTalentos = styled(Button)({
        fontFamily: "Montserrat, sans-serif",
        padding: "10px 16px",
        borderRadius: "6px",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: "transparent",
        color: "#0f9eea",
        border: "2px solid #0F9EEA",
        lineHeight: "1.3",
    });

    // const isFreelancer = usuario.funcao;
    const isFreelancer = sessionStorage.getItem("funcao") == "FREELANCER";
    const isOwnProfile = usuario.isOwnProfile;

    let showOptions;

    if (!isFreelancer && isOwnProfile) {
        showOptions = (
            <ButtonExplorarTalentos className={styles['botaoCondicional']}>Editar Perfil</ButtonExplorarTalentos>
        )
    } else if (isFreelancer && isOwnProfile) {
        showOptions = (
            <BlueBackgroundButton className={styles['botaoCondicional']}>Editar Perfil</BlueBackgroundButton>
        )
    } else if (!isFreelancer && !isOwnProfile) {
        showOptions = (
            <>
                <Checkbox color="error" style={{ marginRight: '6px' }} icon={<FavoriteBorder sx={{ fontSize: 32 }} style={{ color: '#505050' }} />} checkedIcon={<Favorite sx={{ fontSize: 32 }} />} />
                <Link to='/conversas'>
                    <EmailOutlinedIcon className={styles['icons']} sx={{ fontSize: 32 }} />
                </Link>
                <BlueBackgroundButton className={styles['botaoCondicional']}>Proposta</BlueBackgroundButton>
            </>
        )
    }

    return (
        <>
            <div className={styles['content__banner']} style={{backgroundImage: `url(${usuario.urlFotoWallpaper || ''})`}}>
                <div>
                    <Avatar className={styles['banner__imagemUsuario']}
                        alt={'Imagem de perfil de ' + usuario.nomeUsuario}
                        src={usuario.urlFotoPerfil}
                        sx={{ width: 150, height: 150 }}
                    />
                </div>
            </div>
            <div className={styles['content__descUsuario']}>
                <div className={styles['content__infoUsuario']}>
                    <div className={styles['infoUsuario__nome']}>
                        {/* Limitar a Length da input para até 50 caracteres */}
                        <h1>{usuario?.nome || "Sem nome"}</h1>
                        <div className={styles['infoUsuario__icones']}>
                            <a href={usuario.linkLinkedin} target="_blank"><img src={LinkedinImg} alt="Ícone LinkedIn" /></a>
                            <a href={usuario.linkGithub} target="_blank"><img src={GitHubImg} alt="Ícone GitHub" /></a>
                        </div>
                    </div>
                    <div className={styles['infoUsuario__desc']}>
                        {/* Limitar a Length da input para até 80 caracteres */}
                        <p>{usuario?.descricao || "Usuário sem descrição"}</p>
                    </div>
                    <div className={styles['infoUsuario__nacionalidade']}>
                        {/* <a href=""><img src={LinkedinImg} alt={'Bandeira do ' + props.pais} /></a> */}
                        <ReactCountryFlag countryCode="BR" svg style={{
                            fontSize: '1.3em',
                            lineHeight: '1.3em',
                        }} />
                        <p>{usuario.pais}</p>
                    </div>
                </div>
                <div className={styles['descUsuario__button']}>
                    {showOptions}
                </div>
            </div>
        </>
    );
}

export default BannerDescUsuario;