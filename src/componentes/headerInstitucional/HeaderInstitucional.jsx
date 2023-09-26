import "./HeaderInstitucional.css";
import LogoTechHub from "../../assets/images/LogoTechHub.png";

const HeaderInstitucional = () => {
  return (
    <div className="HeaderInstitucional">
      <div className="left__components">
        <img src={LogoTechHub} alt="" />
      </div>
      <div className="middle__components">
        <ul>
          <a href="#">
            <li className='active'>Início</li>
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
          <a href=""><li>Login</li></a>
          <button>Cadastre-se</button>
        </ul>
      </div>
    </div>
  );
};

export default HeaderInstitucional;
