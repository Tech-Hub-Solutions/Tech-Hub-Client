import React from "react";
import Header from "../../componentes/shared/header/Header";
import styles from "./Favoritos.module.css";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";
import SelectOrdernar from "../../componentes/shared/SelectOrdernar";
import MockImageCardPerfil from "../../assets/images/mockImageCardPerfil.png";
import axiosInstance from '../../config/axiosInstance'

const Favoritos = () => {
    const [valueOrdenar, setValueOrdenar] = React.useState("");
    const [usuarios, setUsuarios] = React.useState([]);
    const [usuariosSelecionados, setUsuariosSelecionados] = React.useState([]);

    React.useEffect(() => {
        axiosInstance.get("usuarios/favoritos")
            .then((response) => {
                if (response.status == 200) {
                    const responseUsuarios = response.data.content;

                    const responseMapeada = responseUsuarios.map((item) => {
                        return {
                            ...item,
                            isFavorito: true,
                        };
                    });

                    setUsuarios(responseMapeada);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <h1 className={styles["favoritos__titulo"]}>Favoritos</h1>
                    <div className={styles["favoritos__header"]}>
                        <h2 className={styles["favoritos__quantidade-desenvolvedores"]}>
                            {usuarios.length} desenvolvedores na lista de favoritos
                        </h2>
                        <SelectOrdernar
                            valueOrdenar={valueOrdenar}
                            setValueOrdenar={setValueOrdenar}
                        />
                    </div>

                    <div className={styles['usuarios']}>
                        {
                            usuarios.map((usuario) => (
                                <CardPerfil
                                    key={usuario.id}
                                    usuario={usuario}
                                    isTelaFavoritos={true}
                                    setUsuarios={setUsuarios}
                                    usuariosSelecionados={usuariosSelecionados}
                                    setUsuariosSelecionados={setUsuariosSelecionados}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Favoritos;