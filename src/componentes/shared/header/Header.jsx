import styles from './header.module.css'
import React from "react";
import TechHubImg from "../../../assets/images/tech-hub-logo-text.svg"
import AccountMenu from './materialComponents/AccountMenu';
import { Link } from 'react-router-dom';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Header = () => {

    return (
        <header className={styles['header']}>
            <div className={styles['content']}>
                <div className={styles['logo__tech-hub']}>
                    <Link to={'/'}>
                        <img src={TechHubImg} alt="Logo Tech Hub" />
                    </Link>
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
                    <Link to={'/'}>
                        <FavoriteBorderOutlinedIcon className={styles['icone__header']} sx={{ fontSize: 26 }} />
                    </Link>
                    <Link to={'/'}>
                        <MessageOutlinedIcon className={styles['icone__header']} sx={{ fontSize: 26 }} />
                    </Link>
                    <AccountMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;