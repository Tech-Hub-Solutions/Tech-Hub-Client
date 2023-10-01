import iconVerified from "../../../assets/images/iconVerified.svg"
import "./Beneficios.css"
import CardIndicadores from "./CardIndicadores"


const Beneficios = () => {
    const styleCard1 = {
        backgroundColor: '#BBE6FC',
        color: '#0686C8',
    }

    const styleCard2 = {
        backgroundColor: '#D8FFC6',
        color: '#4BC015',
    }

    const styleCard3 = {
        backgroundColor: '#FFD6D3',
        color: '#F3685F',
    }

    const styleCard4 = {
        backgroundColor: '#E1D3FF',
        color: '#915DFF',
    }

    return (
        <section className="section__beneficios">
            <div className="content__beneficios">
                <div className="beneficios__text">
                    <h1>O que podemos te proporcionar</h1>
                    <div className="text__titulo-beneficio">
                        <img src={iconVerified} alt="Ícone verificado" />
                        <h3>Personalização de portfólio</h3>
                    </div>
                    <p>Avalie habilidades e competências com confiança antes de tomar uma decisão. Enxergue além das palavras e conheça o potencial real.</p>
                    <div className="text__titulo-beneficio">
                        <img src={iconVerified} alt="Ícone verificado" />
                        <h3>Seleção e comparação entre freelancers</h3>
                    </div>
                    <p>Tome decisões informadas e simplifique a seleção. Compare habilidades técnicas e socioemocionais para escolher o candidato ideal.</p>
                    <div className="text__titulo-beneficio">
                        <img src={iconVerified} alt="Ícone verificado" />
                        <h3>Chat online</h3>
                    </div>
                    <p>Comunique-se com transparência por meio do nosso chat online. Alinhe expectativas e detalhes essenciais do projeto de forma clara e direta.</p>
                </div>
                <div className="beneficios__card">
                    <div className="card__left">
                        <CardIndicadores style={styleCard1} titulo="400+" texto="freelancers engajados" />
                        <CardIndicadores style={styleCard2} titulo="R$ 1.2M+" texto="movimentados" />
                    </div>
                    <div className="card__right">
                        <CardIndicadores style={styleCard3} titulo="30+ Projetos" texto="bem-sucedidos" />
                        <CardIndicadores style={styleCard4} titulo="120+" texto="empresas parceiras" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Beneficios