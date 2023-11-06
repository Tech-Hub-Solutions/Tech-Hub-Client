import React, { useRef } from "react";
import Header from "../../componentes/shared/header/Header";
import styles from "./Favoritos.module.css";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";
import SelectOrdernar from "../../componentes/shared/SelectOrdernar";
import axiosInstance from '../../config/axiosInstance'

import CompararUsuarios from "../../componentes/favoritos/compararUsuarios";
import { Button } from "@mui/material";

const Favoritos = () => {
    const [valueOrdenar, setValueOrdenar] = React.useState("");
    const [usuarios, setUsuarios] = React.useState([]);
    const totalUsuarios = useRef(0);
    const [usuariosSelecionados, setUsuariosSelecionados] = React.useState([]);
    const [showComparacao, setComparacao] = React.useState(false);
    const [conjuntoSkill, setConjuntoSkill] = React.useState([]);
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        carregarUsuarios();
    }, [page]);

    const carregarUsuarios = async () => {
        let sort; 
       
        await axiosInstance.get(`usuarios/favoritos?page=${page}&size=10%sort`)
            .then((response) => {
                if (response.status == 200) {
                    const responseUsuarios = response.data.content;
                    const conjuntoSkillResponse = conjuntoSkill;

                    if (totalUsuarios.current == 0) {
                        totalUsuarios.current = response.data.totalElements;
                    }

                    const responseMapeada = responseUsuarios.map((usuario) => {

                        usuario?.flags?.forEach(flag => {
                            const area = conjuntoSkillResponse.find(area => area.area == flag.area);

                            if (!area) {
                                conjuntoSkillResponse.push({ area: flag.area, tecnologias: [] });
                            }

                            const tecnologia = area?.tecnologias.find(tecnologia => tecnologia == flag.nome);
                            if (!tecnologia) {
                                area?.tecnologias.push(flag.nome);
                            }
                        });

                        return {
                            ...usuario,
                            isFavorito: true,
                        };
                    });

                    setConjuntoSkill(conjuntoSkillResponse);
                    setUsuarios([...usuarios, ...responseMapeada]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Header />
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <h1 className={styles["favoritos__titulo"]}>Favoritos</h1>
                    <div className={styles["favoritos__header"]}>
                        <h2 className={styles["favoritos__quantidade-desenvolvedores"]}>
                            {totalUsuarios?.current} desenvolvedores na lista de favoritos
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
                    {
                        usuarios.length < totalUsuarios.current &&
                        <div className={styles['usuarios__ver-mais']}>
                            <Button style={{ color: 'var(--color-cinza)', marginBottom: '32px', fontWeight: '500' }} onClick={() => setPage(prev => prev + 1)}>Ver mais</Button>
                        </div>
                    }
                </div>
            </div>
            {
                usuariosSelecionados.length > 1 &&
                <CompararUsuarios
                    usuariosSelecionados={usuariosSelecionados}
                    setUsuariosSelecionados={setUsuariosSelecionados}
                    conjuntoSkill={conjuntoSkill}
                    showComparacao={showComparacao}
                    setComparacao={setComparacao}
                />
            }

        </>
    )
};

export default Favoritos;