import styles from './header.module.css'
import React from "react";
import TechHubImg from "../../../assets/images/tech-hub-logo-text.svg"
import IconeFavoritosImg from "../../../assets/images/IconeFavoritos.svg"
import IconeMensagensImg from "../../../assets/images/IconeMensagens.svg"

const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['content']}>
                <div className={styles['logo__tech-hub']}>
                    <a href="#">
                        <img src={TechHubImg} alt="Logo Tech Hub" />
                    </a>
                </div>
                <div className={styles['right__content']}>
                    <ul>
                        <a href="#">
                            <li>
                                Explorar Talentos
                            </li>
                        </a>
                        <a href="">
                            <li>
                                Contratos
                            </li>
                        </a>
                    </ul>
                    <a href="">
                        <img className={styles['icone__header']} src={IconeFavoritosImg} alt="Ícone de favoritos" />
                    </a>
                    <a href="">
                        <img className={styles['icone__header']} src={IconeMensagensImg} alt="Ícone de mensagens" />
                    </a>
                    <img className={styles['foto__perfil']} src='' alt="Foto de perfil do usuário" />
                </div>
            </div>
        </header>
    );
}

export default Header;