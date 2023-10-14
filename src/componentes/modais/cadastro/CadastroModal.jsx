// import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import styles from "./CadastroModal.module.css";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import CadastroEmpresaImage from "../../../assets/images/CadastroEmpresa.svg";
import CadastroFreelancerImage from "../../../assets/images/CadastroFreelancer.svg";
import GoogleVetor from "../../../assets/images/GoogleVetor.svg";
import Divider from "@mui/material/Divider";

import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
function CadastroModal({ user, isCadastroModalOpen, setIsCadastroModalOpen }) {
  const stylesCSS = {
    dialogContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      maxWidth: "fit-content",
      borderRadius: "16px",
      overflow: "hidden",
    },
    dialogContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
      gap: "16px",
      padding: 0,
    },
    dialogTitle: {
      color: "#0f9eea",
      fontFamily: "Montserrat, sans-serif",
      textAlign: "center",
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      paddingBottom: "40px",
    },
    buttonGoogle: {
      border: "1px solid #333",
      color: "#333",
      gap: "15px",
      padding: "18px 36px",
      borderRadius: "6px",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      textTransform: "none",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "1.3",
    },
    customDivider: {
      width: "100%",
      color: "#666666",
      fontWeight: 600,
    },
    blueButton: {
      padding: "18px 125px",
      marginTop: "48px",
    },
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [senha, setSenha] = useState("");
  const [senhaError, setSenhaError] = useState(false);

  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [documento, setDocumento] = useState("");
  const [documentoError, setDocumentoError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setNomeError(false);
    setPasswordError(false);

    if (nome == "") {
      setNomeError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (nome && password) {
      console.log(nome, password);
    }
  };

  const handleClose = () => {
    setIsCadastroModalOpen(false);
  };

  const redictToBuscar = () => {
    // TODO - Inserir roteamento p/ ir à página de buscar talentos ou de perfil
    return null;
  };

  const imageCadastroUser =
    user === "freelancer" ? CadastroFreelancerImage : CadastroEmpresaImage;
  const altImageCadastroUser =
    user === "freelancer"
      ? "Imagem de um homem freelancer"
      : "Imagem de homem empresário";

  if (isCadastroModalOpen) {
    return (
      <>
        <Dialog
          fullWidth
          open={true}
          onClose={handleClose}
          keepMounted
          PaperProps={{
            sx: stylesCSS.dialogContainer,
          }}
        >
          <div>
            <img
              style={{ width: "438px" }}
              src={imageCadastroUser}
              alt={altImageCadastroUser}
            />
          </div>

          <div className={styles["form__container"]}>
            <DialogTitle sx={stylesCSS.dialogTitle}>{"Cadastro"}</DialogTitle>
            <DialogContent sx={stylesCSS.dialogContent}>
              <Button variant="outlined" sx={stylesCSS.buttonGoogle}>
                <img
                  style={{ width: "23px" }}
                  src={GoogleVetor}
                  alt="Logo da Google"
                />
                Cadastre-se com Google
              </Button>

              <Divider sx={stylesCSS.customDivider}>OU</Divider>

              <Grid container rowSpacing={1}>
                <form autoComplete="off" onSubmit={handleSubmit} >
                  <Grid item>
                    <TextField
                      label="Nome completo"
                      onChange={(e) => setNome(e.target.value)}
                      required
                      variant="outlined"
                      color="primary"
                      type="text"
                      sx={{ mb: 3 }}
                      value={nome}
                      error={nomeError}
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="CPF"
                      onChange={(e) => setDocumento(e.target.value)}
                      required
                      variant="outlined"
                      color="primary"
                      type="number"
                      sx={{ mb: 3 }}
                      value={documento}
                      error={documentoError}
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="outlined"
                      color="primary"
                      type="email"
                      sx={{ mb: 3 }}
                      value={email}
                      error={emailError}
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Senha"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      variant="outlined"
                      color="primary"
                      type="password"
                      value={password}
                      error={passwordError}
                      sx={{ mb: 3 }}
                      fullWidth
                    />
                  </Grid>

                  <BlueBackgroundButton
                    onClick={redictToBuscar}
                    style={stylesCSS.blueButton}
                    type="submit"
                  >
                    Cadastre-se
                  </BlueBackgroundButton>
                </form>
              </Grid>
            </DialogContent>

            <div className={styles["possui-conta"]}>
              <p>
                Já tem conta?
                <Link to="/busca-talentos" className={styles["link-login"]}>
                  Acesse aqui.
                </Link>
                {/* TODO - pensar no path do <Link to > */}
              </p>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
  return null;
}

CadastroModal.propTypes = {
  isCadastroModalOpen: PropTypes.bool.isRequired,
  setIsCadastroModalOpen: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default CadastroModal;
