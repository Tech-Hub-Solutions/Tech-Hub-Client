import LogoTech from "../../assets/images/tech-hub-logo.svg"
import TelefoneVetor from "../../assets/images/telefoneVetor.svg"
import EmailVetor from "../../assets/images/emailVetor.svg"
import InstagramVetor from "../../assets/images/instagramVetor.svg"
import GitHubVetor from "../../assets/images/githubVetor.svg"
import LinkedinVetor from "../../assets/images/linkedinVetor.svg"
import XVetor from "../../assets/images/xVetor.svg"
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <img src={LogoTech} alt="Logo Tech Hub" />
                <div className="footer__information">
                    <div className="footer__contacts">
                        <h1>Contatos</h1>
                        <div className="footer__text">
                            <img src={EmailVetor} alt="" />
                            <h4>suporte@techhub.com</h4>
                        </div>
                        <div className="footer__text">
                            <img src={TelefoneVetor} alt="" />
                            <h4>(11) 9 8991-1231</h4>
                        </div>
                    </div>
                    <div className="footer__social">
                        <h1>Redes sociais</h1>
                        <div className="icones__social">
                            <a href=""><img src={InstagramVetor} alt="" /></a>
                            <a href=""><img src={LinkedinVetor} alt="" /></a>
                            <a href=""><img src={GitHubVetor} alt="" /></a>
                            <a href=""><img src={XVetor} alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer