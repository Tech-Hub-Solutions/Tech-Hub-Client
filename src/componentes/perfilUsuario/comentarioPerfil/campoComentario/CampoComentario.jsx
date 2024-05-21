import React from "react";
import styles from "./campoComentario.module.css";

import ReactCountryFlag from "react-country-flag";
import { Avatar, Box, Rating, TextField } from "@mui/material";
import BlueBackgroundButton from "../../../shared/BlueButton/BlueBackgroundButton";
import axiosInstance from "../../../../config/axiosInstance";
import SnackbarCustom from "../../../shared/snackbar/SnackbarCustom";
import CountryInformation from "../../../shared/CountryInformation/CountryInformation";

const CampoComentario = (props) => {
  const [qtdEstrelas, setQtdEstrelas] = React.useState(2);
  const [comentarioUsuario, setComentarioUsuario] = React.useState("");
  const [snackbarSuccess, setSnackbarSuccess] = React.useState({});
  const pais = localStorage.getItem("pais");
  const urlFotoPerfil = localStorage.getItem("urlFotoPerfil");
  const nome = localStorage.getItem("nome");

  const fazerComentario = () => {
    axiosInstance
      .post(`/perfis/avaliacao/${props.idRequisicao}`, {
        comentario: comentarioUsuario,
        qtdEstrela: qtdEstrelas,
      })
      .then((response) => {
        props.carregarAvaliacaoGeral();
        props.trazerComentarios(0, props.idRequisicao);

        setSnackbarSuccess({
          open: true,
          isError: false,
          severity: "success",
          message: "Comentário enviado com sucesso!",
        });

        setComentarioUsuario("");
      })
      .catch((error) => {
        setSnackbarSuccess({
          open: true,
          isError: true,
          severity: "error",
          message: "Erro ao enviar comentário. Tente novamente.",
        });
      });
  };

  return (
    <div className={styles["comentario"]}>
      <div className={styles["comentario__fotoPerfil"]}>
        <Avatar src={urlFotoPerfil}>{nome[0]}</Avatar>
      </div>
      <div className={styles["comentario__content"]}>
        <h1>{props.nomeUsuario}</h1>
        <div className={styles["infoUsuario__nacionalidade"]}>
          <CountryInformation pais={pais} />
        </div>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            value={qtdEstrelas}
            onChange={(event, newValue) => {
              setQtdEstrelas(newValue);
            }}
          />
        </Box>
        <div className={styles["comentario__input"]}>
          <TextField
            style={{ width: "95%", fontFamily: "Montserrat" }}
            id="outlined-multiline-static"
            label="Adicione um comentário"
            multiline
            rows={4}
            value={comentarioUsuario}
            onChange={(e) => {
              setComentarioUsuario(e.target.value);
            }}
          />
        </div>
        <div className={styles["comentario__button"]}>
          <BlueBackgroundButton
            valueDisabled={comentarioUsuario.length === 0}
            onClick={fazerComentario}
          >
            Comentar
          </BlueBackgroundButton>
        </div>
      </div>

      <SnackbarCustom
        snackbarOpen={snackbarSuccess.open}
        message={snackbarSuccess.message}
        severity={snackbarSuccess.severity}
        time={3000}
        setSnackbarOpen={() => {
          setSnackbarSuccess((prevState) => ({
            ...prevState,
            open: false,
          }));
        }}
      ></SnackbarCustom>
    </div>
  );
};

export default CampoComentario;
