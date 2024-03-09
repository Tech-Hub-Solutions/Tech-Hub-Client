import React from "react";
import styles from "./erros.module.css";

const NotFound = () => {

    return (
        <div className={styles['content__not-found']}>
            <h1>404</h1>
            <p>Página não encontrada {":("} </p>
        </div>
    );
}

export default NotFound;
