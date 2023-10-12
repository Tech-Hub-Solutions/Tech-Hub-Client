import React from "react";
import "./HeaderInstitucional.css";
import LogoTechHub from "../../../assets/images/LogoTechHub.png";

import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import TravaTelaCadastro from "../../modais/TravaTelaCadastro/TravaTelaCadastro";

const HeaderInstitucional = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="header__section">
      <div className="header__institucional">
        <div className="left__components">
          <a href="#">
            <img src={LogoTechHub} alt="" />
          </a>
        </div>
        <div className="middle__components">
          <ul>
            <a href="#">
              <li className="active">Início</li>
            </a>
            <a href="#">
              <li>Explorar Talentos</li>
            </a>
            <a href="#">
              <li>Sobre Nós</li>
            </a>
            <a href="#">
              <li>Benefícios</li>
            </a>
          </ul>
        </div>
        <div className="right__components">
          <ul>
            <a href="#">
              <li>Login</li>
            </a>
            <BlueBackgroundButton onClick={() => setIsOpen(!isOpen)}>
              Cadastre-se
            </BlueBackgroundButton>
            <TravaTelaCadastro isOpen={isOpen} setIsOpen={setIsOpen} />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderInstitucional;
