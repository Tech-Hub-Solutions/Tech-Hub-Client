import "./PrimeiraSecao.css";
import RhWoman from "../../../assets/images/RhWoman.png";

const PrimeiraSecao = () => {
  return (
    <div className="first__section">
      <div className="container__section">
        <div className="container__left-part">
            <h1>Dficuldade em encontrar <span>talentos?</span></h1>
        </div>
        <div className="container__right-part">
          <img src={RhWoman} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraSecao;
