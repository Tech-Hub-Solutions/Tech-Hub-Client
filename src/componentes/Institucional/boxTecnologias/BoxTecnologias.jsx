import CardTecnologia from "../cardTecnologia/CardTecnologia"
import LogoReact from "../../../assets/images/LogoReact.png"
import LogoJava from "../../../assets/images/LogoJava.png"
import LogoKotlin from "../../../assets/images/LogoKotlin.png"
import LogoJUnity from "../../../assets/images/LogoJUnity.png"
import LogoPycharm from "../../../assets/images/LogoPycharm.png"
import LogoGit from "../../../assets/images/LogoGit.png"
import LogoAI from "../../../assets/images/LogoAI.png"

import "./BoxTecnologias.css"

const BoxTecnologias = () => {
    return (
        <section className="section__tecnologias">
            <div className="container__tecnologias">
                <h1>O que você precisa a gente tem</h1>
                <div className="box__tecnologias">
                    <h3>Procure pelas tecnologias desejadas!</h3>
                    <hr />
                    <div className="tecnologias">
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoReact} />
                            <p>Front-end</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoJava} />
                            <p>Back-end</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoKotlin} />
                            <p>Mobile</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoJUnity} />
                            <p>Testes</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoPycharm} />
                            <p>Análise de dados</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoGit} />
                            <p>DevOps</p>
                        </div>
                        <div className="combo__tecnologia">
                            <CardTecnologia imagem={LogoAI} />
                            <p>Inteligência Artificial</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BoxTecnologias