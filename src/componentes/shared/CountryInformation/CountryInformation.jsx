import React from "react";
import styles from "./countryInformation.module.css";
import ReactCountryFlag from "react-country-flag";
import bandeiras from "./perfil-usuario.json";

const CountryInformation = ({pais}) => {
    return (
        <div className={styles['infoUsuario__nacionalidade']}>
            <ReactCountryFlag
                countryCode={pais || ""}
                svg
                style={{
                    fontSize: '1.3em',
                    lineHeight: '1.3em',
                }} />
            <p>{
                bandeiras.find(bandeira => bandeira.sigla === pais)?.nome || ""
            }</p>
        </div>
    )
}

export default CountryInformation;