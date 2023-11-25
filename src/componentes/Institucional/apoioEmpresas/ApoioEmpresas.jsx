import './ApoioEmpresas.css'
import LogoBradesco from '../../../assets/images/Logo Bradesco.svg'
import LogoBRQ from '../../../assets/images/Logo BRQ.svg'
import LogoMatrix from '../../../assets/images/Logo Matrix.svg'
import LogoSPTech from '../../../assets/images/Logo SPTech.svg'


const ApoioEmpresas = () => {
    return (
        <div className='section__empresas'>
            <div className='empresas__container'>
                <h3>Aprovado por:</h3>
                <img src={LogoBradesco} alt="" />
                <img src={LogoBRQ} alt="" />
                <img src={LogoSPTech} alt="" />
                <img src={LogoMatrix} alt="" />
            </div>
        </div>
    )
}

export default ApoioEmpresas