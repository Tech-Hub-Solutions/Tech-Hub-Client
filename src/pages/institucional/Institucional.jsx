import BoxTecnologias from "../../componentes/Institucional/BoxTecnologias/BoxTecnologias";
import ApoioEmpresas from "../../componentes/Institucional/apoioEmpresas/ApoioEmpresas";
import Beneficios from "../../componentes/Institucional/beneficios/Beneficios";
import DiagramaVisao from "../../componentes/Institucional/diagramaVisao/DiagramaVisao";
import HeaderInstitucional from "../../componentes/Institucional/headerInstitucional/HeaderInstitucional";
import Primeirasecao from "../../componentes/Institucional/primeiraSecao/PrimeiraSecao";
import Footer from "../../componentes/footer/Footer";
import "./institucional.css";

const Institucional = () => {
  return (
    <div>
        <HeaderInstitucional />
        <Primeirasecao />
        <ApoioEmpresas />
        <BoxTecnologias />
        <DiagramaVisao />
        <Beneficios />
        <Footer />
    </div>
  );
};

export default Institucional;
