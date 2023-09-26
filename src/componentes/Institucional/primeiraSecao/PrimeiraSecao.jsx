import "./PrimeiraSecao.css";
import RhWoman from "../../../assets/images/RhWoman.png";

const PrimeiraSecao = () => {
  return (
    <div className="first__section">
      <div className="container__section">
        <div className="container__left-part">
          <h1>Dificuldade em <br />encontrar <span>talentos</span>?</h1>
          <p>Unindo talento e necessidade: o ponto de encontro para desenvolvedores freelancers e empresas!</p>
          <div className='container__buttons'>
            <button className='button__left'>Quero ser um freelancer</button>
            <button className='button__right'>Explorar talentos</button>
          </div>
        </div>
        <div className="container__right-part">
          <img src={RhWoman} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PrimeiraSecao;
