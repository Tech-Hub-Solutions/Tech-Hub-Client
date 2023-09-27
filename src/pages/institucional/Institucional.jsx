import ApoioEmpresas from "../../componentes/Institucional/apoioEmpresas/ApoioEmpresas";
import HeaderInstitucional from "../../componentes/Institucional/headerInstitucional/HeaderInstitucional";
import Primeirasecao from "../../componentes/Institucional/primeiraSecao/PrimeiraSecao";
import "./institucional.css";

const Institucional = () => {
  return (
    <div>
        <HeaderInstitucional />
        <Primeirasecao />
        <ApoioEmpresas />
    </div>
  );
};

export default Institucional;
