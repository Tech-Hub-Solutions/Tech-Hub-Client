import LogoBradesco from '../../../assets/images/Logo Bradesco.svg'
import './CardTecnologia.css'

const CardTecnologia = () => {
    return (
        <div className="card__tecnologia">
            <div className="img__card">
                <img src={LogoBradesco} alt="" />
            </div>
        </div>
    )
}

export default CardTecnologia