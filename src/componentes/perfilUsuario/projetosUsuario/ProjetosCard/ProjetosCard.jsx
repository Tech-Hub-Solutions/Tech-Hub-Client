import { Button } from "@mui/material";
import React from "react";
import LanguageLogo from "../LanguageLogo";
import styles from './projetosCard.module.css'

const ProjetosLoadingBox = ({ repositorio }) => {
    return (
        <Button
            onClick={() => window.open(repositorio.url, "_blank")}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '1rem',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                boxShadow: ' 0 0 5px rgba(0, 0, 0, 0.2)',
                margin: '1rem',
                padding: '2rem',
                width: '10rem',
                minWidth: '20rem',
                height: 'auto',
                textTransform: 'none',
                position: 'relative',
            }}>
            <h2 className={styles['card__titulo']}> {repositorio.name}</h2>
            <p className={styles['card__descricao']}>{
                repositorio.description ||
                <span className={styles['card__sem-descricao']}> Sem descrição </span>
            }</p>
            <div className={styles['card__linguagens']}>
                {
                    repositorio.languagens?.map((languagen) => {
                        return (
                            <LanguageLogo language={languagen} height={"30px"} />
                        )
                    })
                }
            </div>
        </Button>
    )

}

export default ProjetosLoadingBox;