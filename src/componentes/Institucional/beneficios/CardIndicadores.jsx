import "./CardIndicadores.css"

const CardIndicadores = (props) => {
    return (
        <div style={props.style} className="card__indicador">
            <h1>{props.titulo}</h1>
            <p>{props.texto}</p>
        </div>
    )
}

export default CardIndicadores