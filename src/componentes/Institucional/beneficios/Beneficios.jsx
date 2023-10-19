import iconVerified from "../../../assets/images/iconVerified.svg"
import "./Beneficios.css"
import CardIndicadores from "./CardIndicadores"
import CompareOutlinedIcon from '@mui/icons-material/CompareOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Button } from "@mui/base";
import styled from "@emotion/styled";


const Beneficios = () => {

    const ButtonExplorarTalentos = styled(Button)({
        fontFamily: "Montserrat, sans-serif",
        padding: "10px 16px",
        borderRadius: "6px",
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: "16px",
        textTransform: "none",
        backgroundColor: "transparent",
        color: "#0f9eea",
        border: "2px solid #0F9EEA",
    });

    const styleCard1 = {
        backgroundColor: '#BBE6FC',
        color: '#0686C8',
        p: '#105C83',
    }

    const styleCard2 = {
        backgroundColor: '#D8FFC6',
        color: '#4BC015',
        p: '#42951B',
    }

    const styleCard3 = {
        backgroundColor: '#FFD6D3',
        color: '#F3685F',
        p: '#AB453F',
    }

    const styleCard4 = {
        backgroundColor: '#E1D3FF',
        color: '#915DFF',
        p: '#6527E8',
    }

    return (
        <section className="section__beneficios">
            <div className="content__beneficios">
                <div className="beneficios__text">
                    <h1>O que podemos te proporcionar</h1>
                    <div className="text__titulo-beneficio">
                        <BorderColorOutlinedIcon style={{ color: 'var(--color-azul)' }} />
                        <h3>Personalização de portfólio</h3>
                    </div>
                    <p>Avalie habilidades e competências com confiança antes de tomar uma decisão. Enxergue além das palavras e conheça o potencial real.</p>
                    <div className="text__titulo-beneficio">
                        <CompareOutlinedIcon style={{ color: 'var(--color-azul)' }} />
                        <h3>Seleção e comparação entre freelancers</h3>
                    </div>
                    <p>Tome decisões informadas e simplifique a seleção. Compare habilidades técnicas e socioemocionais para escolher o candidato ideal.</p>
                    <div className="text__titulo-beneficio">
                        <ChatOutlinedIcon style={{ color: 'var(--color-azul)' }} />
                        <h3>Chat online</h3>
                    </div>
                    <p>Comunique-se com transparência por meio do nosso chat online. Alinhe expectativas e detalhes essenciais do projeto de forma clara e direta.</p>
                    <ButtonExplorarTalentos className="beneficios__text-button">Cadastre-se agora</ButtonExplorarTalentos>
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