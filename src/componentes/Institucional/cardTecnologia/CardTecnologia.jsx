import './CardTecnologia.css'

const CardTecnologia = (props) => {
    return (
        <div className="card__tecnologia">
            <div className="img__card">
                <img src={props.imagem} alt={props.alt} />
            </div>
        </div>
    )
}

export default CardTecnologia