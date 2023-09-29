import BoxTecnologias from "../../componentes/Institucional/BoxTecnologias/BoxTecnologias";
import ApoioEmpresas from "../../componentes/Institucional/apoioEmpresas/ApoioEmpresas";
import CardTecnologia from "../../componentes/Institucional/cardTecnologia/CardTecnologia";
import HeaderInstitucional from "../../componentes/Institucional/headerInstitucional/HeaderInstitucional";
import Primeirasecao from "../../componentes/Institucional/primeiraSecao/PrimeiraSecao";
import "./institucional.css";

const Institucional = () => {
  return (
    <div>
        <HeaderInstitucional />
        <Primeirasecao />
        <ApoioEmpresas />
        <BoxTecnologias />
    </div>
  );
};

export default Institucional;
