import React, { useState, useEffect } from "react";
import styles from "./CardPerfil.module.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Avatar, Checkbox, Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CardPerfil = (props) => {
  const navigate = useNavigate();

  const {
    usuario,
    usuariosSelecionados,
    setUsuariosSelecionados,
    setUsuarios,
  } = props;
  const usuarioSelecionado = usuariosSelecionados?.find(
    (item) => item.id === usuario.id
  );

  const handleSelecionar = () => {
    setUsuariosSelecionados((prev) => {
      if (!prev) {
        return [usuario];
      }
      if (usuariosSelecionados?.includes(usuario)) {
        return prev.filter((item) => item.id !== usuario.id);
      }
      if (prev.length === 4) {
        return prev;
      }
      return [...prev, usuario];
    });
  };

  const handleFavoritar = () => {
    setUsuarios((prev) => {
      return prev.map((item) => {
        if (item.id === usuario.id) {
          return {
            ...item,
            isFavorito: !item.isFavorito,
          };
        }
        return item;
      });
    });
  };

  const navigateToPerfil = () => {
    navigate({
      pathname: "/perfil",
      // passar parametro de url 1 para pegar com useParam
      search: `?id=${usuario.id}`,
    });
  };
  return (
    <>
      <Card sx={{ width: 280, height: "100%" }}>
        <div onClick={navigateToPerfil} className={styles["navigate__perfil"]}>
          <CardMedia sx={{ height: 187 }} title="Foto de perfil de freelancer">
            <Avatar
              variant="square"
              sx={{ height: "100%", width: "100%" }}
              src={usuario?.urlFotoPerfil}
              title="Foto de perfil de freelancer"
            >
              <p style={{ fontSize: "3rem" }}>{usuario?.nome[0]}</p>
            </Avatar>
          </CardMedia>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <span className={styles["name"]}>{usuario?.nome}</span>

            <div className={styles["container__infos__usuario"]}>
              <span className={styles["function"]}>{usuario?.descricao}</span>

              <Rating
                className={styles["rating"]}
                value={usuario?.qtdEstrela}
                readOnly
              />

              <span className={styles["price"]}>R$ {usuario?.precoMedio}</span>
            </div>
          </CardContent>
        </div>

        {props?.isTelaFavoritos && (
          <CardActions>
            <Button
              fullWidth
              size="small"
              onClick={handleSelecionar}
              sx={{
                backgroundColor: usuarioSelecionado
                  ? "var(--color-azul)"
                  : "var(--color-branco)",
                border: "1px solid var(--color-azul)",
                color: usuarioSelecionado
                  ? "var(--color-branco)"
                  : "var(--color-azul)",
                "&:hover": {
                  backgroundColor: usuarioSelecionado
                    ? "var(--color-azul)"
                    : "var(--color-branco)",
                  color: usuarioSelecionado
                    ? "var(--color-branco)"
                    : "var(--color-azul)",
                },
              }}
            >
              {usuarioSelecionado ? "Selecionado" : "Selecionar"}
            </Button>

            <Checkbox
              checked={usuario.isFavorito}
              onChange={handleFavoritar}
              color="error"
              style={{ marginRight: "6px" }}
              icon={
                <FavoriteBorder
                  sx={{ fontSize: 32 }}
                  style={{ color: "#505050" }}
                />
              }
              checkedIcon={<Favorite sx={{ fontSize: 32 }} />}
            />
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default CardPerfil;
