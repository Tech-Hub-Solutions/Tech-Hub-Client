import React, { useState, useEffect } from "react";
import MockImageCardPerfil from "../../../assets/images/mockImageCardPerfil.png";
import styles from "./CardPerfil.module.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Checkbox, Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const CardPerfil = () => {
  const [valueRating, setValueRating] = useState(4);

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 187 }}
          image={MockImageCardPerfil}
          title="Foto de perfil de freelancer"
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <span className={styles["name"]} gutterBottom component="div">
            Bruno
          </span>

          <span className={styles["function"]}>
            Engenheiro de Software | Tech Lead
          </span>

          <Rating className={styles["rating"]} value={valueRating} readOnly />

          <span className={styles["price"]}>R$ 1200,00</span>
        </CardContent>

        <CardActions>
          <Button fullWidth size="small">
            Selecionar
          </Button>
          <Checkbox
            color="error"
            style={{ marginRight: "6px" }}
            icon={
              <FavoriteBorder
                sx={{ fontSize: 32 }}
                style={{ color: "#505050" }}
              />
            }
            checkedIcon={<Favorite sx={{ fontSize: 32 }} />}
          />{" "}
        </CardActions>
      </Card>
    </>
  );
};

export default CardPerfil;
