import React from "react";
import "./HeaderInstitucional.css";
import LogoTechHub from "../../../assets/images/LogoTechHub.png";

import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import TravaTelaCadastro from "../../modais/travaTelaCadastro/TravaTelaCadastro";
import LoginModal from "../../modais/login/LoginModal";
import CadastroModal from "../../modais/cadastro/CadastroModal";

const HeaderInstitucional = () => {
  const [isCadastroOpen, setCadastroIsOpen] = React.useState(false);
  const [isTravaTelaOpen, setTravaTelaOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  const redirecToLogin = () => {
    setIsLoginModalOpen(true);
    setTravaTelaOpen(false);
  }

  return (
    <>
      <header className="header__section">
        <nav className="header__institucional">
          <div>
            <a href="#">
              <img src={LogoTechHub} alt="Logotipo escrito Tech Hub" />
            </a>
          </div>

          <div>
            <ul>
              <a href="#">
                <li className="active">Início</li>
              </a>

              <a href="#" onClick={redirecToLogin}>
                <li>Explorar Talentos</li>
              </a>

              <a href="#sobre-nos">
                <li>Sobre Nós</li>
              </a>

              <a href="#beneficios">
                <li>Benefícios</li>
              </a>
            </ul>
          </div>

          <div>
            <ul>
              <a
                className="login__button"
                onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
              >
                <li>Login</li>
              </a>

              <BlueBackgroundButton
                onClick={() => setTravaTelaOpen(!isTravaTelaOpen)}
              >
                Cadastre-se
              </BlueBackgroundButton>
            </ul>
          </div>
        </nav>
      </header>

      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setTravaTelaOpen={setTravaTelaOpen}
      />

      <TravaTelaCadastro
        isTravaTelaOpen={isTravaTelaOpen}
        setTravaTelaOpen={setTravaTelaOpen}
        setCadastroIsOpen={setCadastroIsOpen}
        user={user}
        setUser={setUser}
      />

      <CadastroModal
        isCadastroOpen={isCadastroOpen}
        setCadastroIsOpen={setCadastroIsOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        user={user}
      />
    </>
  );
};

export default HeaderInstitucional;
