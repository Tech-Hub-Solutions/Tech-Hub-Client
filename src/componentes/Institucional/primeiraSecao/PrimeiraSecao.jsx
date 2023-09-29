import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";

import styles from "./PrimeiraSecao.css";
import RhWoman from "../../../assets/images/RhWoman.png";
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";

const StackButtons = styled(Stack)({
  display: "flex",
  gap: "32px",
});

const ButtonExplorarTalentos = styled(Button)({
  fontFamily: "Montserrat, sans-serif",
  padding: "10px 16px",
  borderRadius: "6px",
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "16px",
  textTransform: "none",
  backgroundColor: "transparent",
  color: "#0f9eea",
  border: "2px solid #0F9EEA",
});

function PrimeiraSecao() {
  return (
    <div className="first__section">
      <div className="container__section">
        <div className="container__left-part">
          <h1>
            Dificuldade em <br />
            encontrar <span>talentos</span>?
          </h1>
          <p>
            Unindo talento e necessidade: o ponto de encontro para
            desenvolvedores freelancers e empresas!
          </p>
          <StackButtons direction={"row"}>
            <BlueBackgroundButton>Quero ser um freelancer</BlueBackgroundButton>
            <ButtonExplorarTalentos>Explorar talentos</ButtonExplorarTalentos>
          </StackButtons>
        </div>
        <div className="container__right-part">
          <img src={RhWoman} alt="" />
        </div>
      </div>
    </div>
  );
}

export default PrimeiraSecao;
