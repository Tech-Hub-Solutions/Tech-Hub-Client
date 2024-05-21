import styles from './header.module.css'
import React from "react";
import TechHubImg from "../../../assets/images/tech-hub-logo-text.svg"
import AccountMenu from './materialComponents/AccountMenu';
import { Link } from 'react-router-dom';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Header = () => {

    const verificaPagina = (pagina) => {
        if (window.location.pathname === pagina) {
            return styles['active']
        }
        return ''
    }

    const [funcao, setFuncao] = React.useState("");

    React.useEffect(() => {
        const token = localStorage.getItem('funcao');
        setFuncao(token);
    }, []);

    return (
        <div className={styles['abc']}>
            <header className={styles['header']}>
                <div className={styles['content']}>
                    <div className={styles['logo__tech-hub']}>
                        <Link to={'/'}>
                            <img src={TechHubImg} alt="Logo Tech Hub" />
                        </Link>
                    </div>
                    <div className={styles['right__content']}>
                        {
                            funcao != "ADMIN" &&
                            <ul>
                                <Link
                                    className={verificaPagina('/busca-talentos')}
                                    to={'/busca-talentos'}>
                                    <li>
                                        Explorar Talentos
                                    </li>
                                </Link>
                            </ul>
                        }

                        {funcao == "EMPRESA" ?
                            <Link to={'/favoritos'} className={verificaPagina('/favoritos')}>
                                {/* Ícone Favoritos */}
                                <FavoriteBorderOutlinedIcon aria-label='Ícone favoritos' role='button' className={styles['icone__header']} sx={{ fontSize: 26 }} />
                            </Link>
                            : ''}
                        {
                            funcao != "ADMIN" &&
                            <Link to={'/conversas'} className={verificaPagina('/conversas')}>
                                {/* Ícone Mensagens */}
                                <MessageOutlinedIcon className={styles['icone__header']} sx={{ fontSize: 26 }} />
                            </Link>
                        }
                        <AccountMenu />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
