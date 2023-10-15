import PropTypes from "prop-types";
import SerFreelancerTravaTela from "/src/assets/images/SerFreelancerTravaTela.svg";
import SerEmpresaTravaTela from "/src/assets/images/SerEmpresaTravaTela.svg";
import styles from "../travaTelaCadastro/TravaTelaCadastro.module.css";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton.jsx";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

function TravaTelaCadastro({
  isTravaTelaOpen,
  setTravaTelaOpen,
  setCadastroIsOpen,
  setUser,
  user,
}) {
  const stylesCSS = {
    dialogContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "fit-content",
      borderRadius: "16px",
      overflow: "hidden",
      padding: "76px 60px",
    },
    dialogContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      gap: "56px",
      padding: 0,
    },
    cardContainer: {
      border: "1px solid #333",
      borderRadius: "12px",
      width: "400px",
    },
    cardActionArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100% !important",
      height: "auto",
      color: "#0f9eea",
      padding: "36px 30px 0 30px",
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
    blueButton: {
      padding: "18px 125px",
      marginTop: "48px",
    },
  };

  const handleClose = () => {
    setTravaTelaOpen(!isTravaTelaOpen);
  };

  const redictToCadastroEspecifico = () => {
    setTravaTelaOpen(false);
    setCadastroIsOpen(true);
  };

  const clickCard = (user) => {
    setUser(user);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={isTravaTelaOpen}
        onClose={handleClose}
        keepMounted
        PaperProps={{
          sx: stylesCSS.dialogContainer,
        }}
      >
        <DialogTitle sx={stylesCSS.dialogTitle}>
          {"Vamos nos conhecer melhor?"}
        </DialogTitle>
        <DialogContent sx={stylesCSS.dialogContent}>
          <Card
            variant="outlined"
            sx={[
              stylesCSS.cardContainer,
              { backgroundColor: user == "freelancer" ? "#0f9dea54" : "" },
            ]}
          >
            <CardActionArea
              sx={stylesCSS.cardActionArea}
              onClick={() => clickCard("freelancer")}
            >
              <CardMedia
                component="img"
                style={{ width: "160px" }}
                image={SerFreelancerTravaTela}
                alt="Pessoa carregando uma lâmpada"
              />

              <CardContent className={styles["card__content"]}>
                <p className={styles["card__text"]}>Quero ser um freelancer</p>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            variant="outlined"
            sx={[
              stylesCSS.cardContainer,
              { backgroundColor: user == "empresa" ? "#0f9dea54" : "" },
            ]}
          >
            <CardActionArea
              sx={stylesCSS.cardActionArea}
              onClick={() => clickCard("empresa")}
            >
              <CardMedia
                component="img"
                style={{ width: "160px" }}
                image={SerEmpresaTravaTela}
                alt="Tocando as mãos em cumprimento"
              />

              <CardContent className={styles["card__content"]}>
                <p className={styles["card__text"]}>Quero explorar talentos</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>

        <BlueBackgroundButton
          onClick={redictToCadastroEspecifico}
          style={stylesCSS.blueButton}
        >
          Avançar
        </BlueBackgroundButton>
      </Dialog>
    </>
  );
}

export default TravaTelaCadastro;
