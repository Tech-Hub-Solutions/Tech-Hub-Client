import React from "react";
import styles from "./cardProjeto.module.css"
import { Button, CardActions } from "@mui/material";
import GitHubImg from "../../../../assets/images/GithubImg.svg"
import styled from "@emotion/styled";


const CardProjeto = (props) => {

    const BotaoRepositorio = styled(Button) ({
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.10)'
    })

    return (
        <div className={styles['cardProjeto']}>
            <img src="" alt="" style={{ width: '300px', height: '150px' }} />
            <h1>NewChat</h1>
            <p className={styles['cardProjeto__desc']}>Um chat interativo feito em React e Sequelize</p>
            <a href={props.linkRepositorio} target="_blank">
                <BotaoRepositorio size="small" style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
                    <img src={GitHubImg} alt="Ícone LinkedIn" style={{ marginRight: '6px' }} />
                    <p style={{ textTransform: 'capitalize', color: '#485A97' }}>Repositório</p>
                </BotaoRepositorio>
            </a>
        </div>
    );
}

export default CardProjeto;

