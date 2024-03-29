import React from "react";
import "./HeaderInstitucional.css";
import LogoTechHub from "../../../assets/images/LogoTechHub.png";

import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import TravaTelaCadastro from "../../modais/travaTelaCadastro/TravaTelaCadastro";
import LoginModal from "../../modais/login/LoginModal";
import CadastroModal from "../../modais/cadastro/CadastroModal";
import QrCodeModal from "../../modais/autenticacao/QrCodeModal";

const HeaderInstitucional = () => {
  const [isCadastroOpen, setCadastroIsOpen] = React.useState(false);
  const [isTravaTelaOpen, setTravaTelaOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const activeLinkRef = React.useRef([]);

  const redirecToLogin = () => {
    setIsLoginModalOpen(true);
    setTravaTelaOpen(false);
  };

  const handleNavClick = (index) => {
    activeLinkRef.current.forEach((link) => {
      if (link.classList.contains("active")) {
        link.classList.remove("active");
      }
    });
    activeLinkRef.current[index].classList.add("active");
  };

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
              <a href="#"
                onClick={() => handleNavClick(0)}>
                <li ref={(el) => (activeLinkRef.current[0] = el)} className="active">Início</li>
              </a>

              <a
                href="#"
                onClick={(event) => {
                  handleNavClick(1);
                  redirecToLogin();
                }}
              >
                <li ref={(el) => (activeLinkRef.current[1] = el)}>Explorar Talentos</li>
              </a>

              <a href="#sobre-nos"
                onClick={() => handleNavClick(2)}>
                <li ref={(el) => (activeLinkRef.current[2] = el)}>Sobre Nós</li>
              </a>

              <a href="#beneficios"
                onClick={() => handleNavClick(3)}>
                <li ref={(el) => (activeLinkRef.current[3] = el)}>Benefícios</li>
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
      </header >

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
        setIsQrCodeModalOpen={setIsQrCodeModalOpen}
        user={user}
        setUser={setUser}
      />

      <QrCodeModal
        isQrCodeModalOpen={isQrCodeModalOpen}
        setIsQrCodeModalOpen={setIsQrCodeModalOpen}
        user={user}
      />
    </>
  );
};

export default HeaderInstitucional;
