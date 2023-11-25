import "./DiagramaVisao.css"
import imgDiagrama from "../../../assets/images/DiagramaVisao.svg"

const DiagramaVisao = () => {
    return (
        <section className="section__diagrama">
            <div className="content__diagrama">
                <h1>O que é a Tech Hub?</h1>
                <img src={imgDiagrama} alt="" />
            </div>
        </section>
    )
}

export default DiagramaVisao