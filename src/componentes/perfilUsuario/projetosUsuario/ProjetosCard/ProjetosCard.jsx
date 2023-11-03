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
                alignItems: 'start',
                justifyContent: 'flex-start',
                gap: '1rem',
                backgroundColor: '#fff',
                borderRadius: '6px',
                boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.05);',
                margin: '12px',
                padding: '16px',
                width: '280px',
                minWidth: '285px',
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
                            <LanguageLogo language={languagen} height={"40px"} />
                        )
                    })
                }
            </div>
        </Button>
    )

}

export default ProjetosLoadingBox;