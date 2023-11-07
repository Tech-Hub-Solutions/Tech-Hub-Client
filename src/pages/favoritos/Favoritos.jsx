import React from "react";
import Header from "../../componentes/shared/header/Header";
import styles from "./favoritos.module.css";
import CardPerfil from "../../componentes/shared/cardPerfil/CardPerfil";
import SelectOrdernar from "../../componentes/shared/SelectOrdernar";
import axiosInstance from "../../config/axiosInstance";

import CompararUsuarios from "../../componentes/favoritos/CompararUsuarios";

const Favoritos = () => {
  const [valueOrdenar, setValueOrdenar] = React.useState("");
  const [usuarios, setUsuarios] = React.useState([]);
  const [usuariosSelecionados, setUsuariosSelecionados] = React.useState([]);
  const [showComparacao, setComparacao] = React.useState(false);
  const [conjuntoSkill, setConjuntoSkill] = React.useState([]);

  React.useEffect(() => {
    axiosInstance
      .get("usuarios/favoritos")
      .then((response) => {
        if (response.status == 200) {
          const responseUsuarios = response.data.content;
          const conjuntoSkillResponse = [];

          const responseMapeada = responseUsuarios.map((usuario) => {
            usuario?.flags?.forEach((flag) => {
              const area = conjuntoSkillResponse.find(
                (area) => area.area == flag.area
              );

              if (!area) {
                conjuntoSkillResponse.push({
                  area: flag.area,
                  tecnologias: [],
                });
              }

              const tecnologia = area?.tecnologias.find(
                (tecnologia) => tecnologia == flag.nome
              );
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
      <div className={styles["container"]}>
        <div className={styles["content"]}>
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

          <div className={styles["usuarios"]}>
            {usuarios.map((usuario) => (
              <CardPerfil
                key={usuario.id}
                usuario={usuario}
                isTelaFavoritos={true}
                setUsuarios={setUsuarios}
                usuariosSelecionados={usuariosSelecionados}
                setUsuariosSelecionados={setUsuariosSelecionados}
              />
            ))}
          </div>
        </div>
      </div>
      {usuariosSelecionados.length > 1 && (
        <CompararUsuarios
          usuariosSelecionados={usuariosSelecionados}
          setUsuariosSelecionados={setUsuariosSelecionados}
          conjuntoSkill={conjuntoSkill}
          showComparacao={showComparacao}
          setComparacao={setComparacao}
        />
      )}
    </>
  );
};

export default Favoritos;
