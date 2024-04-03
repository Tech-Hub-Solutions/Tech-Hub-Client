import React from "react";
import styles from "./erros.module.css";
import { useParams } from "react-router-dom";

const GenericError = () => {
    const parameter = useParams();
    const code = parameter.code;
    const message = parameter.message;

    return (
        <div className={styles['content__not-found']}>
            <h1>{code}</h1>
            <p>{message} {":("} </p>
        </div>
    );
}

export default GenericError;
