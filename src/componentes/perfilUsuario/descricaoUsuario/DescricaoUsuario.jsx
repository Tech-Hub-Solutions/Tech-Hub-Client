import React from "react";
import styles from "./descricaoUsuario.module.css"

const DescricaoUsuario = (props) => {
    return (
        <>
            <h1 className={styles['titulo']}>{props.titulo}</h1>
            <p className={styles['texto']}>{props.texto}</p>
        </>
    );
}

export default DescricaoUsuario;