import BoxTecnologias from "../../componentes/Institucional/boxTecnologias/BoxTecnologias";
import ApoioEmpresas from "../../componentes/Institucional/apoioEmpresas/ApoioEmpresas";
import Beneficios from "../../componentes/Institucional/beneficios/Beneficios";
import DiagramaVisao from "../../componentes/Institucional/diagramaVisao/DiagramaVisao";
import HeaderInstitucional from "../../componentes/Institucional/headerInstitucional/HeaderInstitucional";
import Primeirasecao from "../../componentes/Institucional/primeiraSecao/PrimeiraSecao";
import Footer from "../../componentes/shared/footer/Footer";
import "./institucional.css";

const Institucional = () => {
  return (
    <div>
      <HeaderInstitucional />
      <Primeirasecao />
      <ApoioEmpresas />
      <BoxTecnologias />
      <div id="sobre-nos">
        <DiagramaVisao />
      </div>
      <div id="beneficios">
        <Beneficios />
      </div>
      <Footer />
    </div>
  );
};

export default Institucional;
