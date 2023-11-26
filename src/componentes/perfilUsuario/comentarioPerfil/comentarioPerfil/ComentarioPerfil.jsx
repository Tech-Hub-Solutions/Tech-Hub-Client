import React from "react";
import styles from "./comentarioPerfil.module.css";
import { Avatar, Box, Divider, Rating } from "@mui/material";
import CountryInformation from "../../../shared/CountryInformation/CountryInformation";
import { Link, useNavigate } from "react-router-dom";

const ComentarioPerfil = ({ comentario }) => {
  const navigate = useNavigate();

  const redirectToPerfil = () => {
    navigate({
      pathname: "/perfil",
      // passar parametro de url 1 para pegar com useParam
      search: `?id=${comentario.idAvaliador}`,
    });

    navigate(0);
  };

  return (
    <div className={styles["divider"]}>
      <div className={styles["comentario"]}>
        <div className={styles["comentario__fotoPerfil"]}>
          <Avatar src={comentario.urlFotoPerfil}>
            {comentario.avaliador[0]}
          </Avatar>
        </div>
        <div className={styles["comentario__content"]}>
          <h1 onClick={redirectToPerfil}>{comentario.avaliador}</h1>
          <div className={styles["infoUsuario__nacionalidade"]}>
            <CountryInformation pais={comentario.pais} />
          </div>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="read-only"
              value={Number(comentario.qtdEstrela)}
              readOnly
            />
          </Box>
          <p className={styles["comentario__text"]}>{comentario.comentario}</p>
        </div>
      </div>
      <Divider style={{ margin: "32px 0" }} />
    </div>
  );
};

export default ComentarioPerfil;
