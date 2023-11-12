import React from "react";
import styles from "./bannerDescUsuario.module.css"
import { Avatar, Checkbox, CircularProgress } from "@mui/material";

import LinkedinImg from "../../../assets/images/LinkedinImg.svg"
import GitHubImg from "../../../assets/images/GithubImg.svg"
import BlueBackgroundButton from "../../shared/BlueButton/BlueBackgroundButton";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AlterarImagem from "../AlterarImagem";
import CountryInformation from "../../shared/CountryInformation/CountryInformation";
import AlterarCurriculo from "./AlterarCurriculo";


const BannerDescUsuario = (props) => {

    const [showOptions, setShowOptions] = React.useState(null);
    const [isPerfilFreelancer, setPerfilFreelancer] = React.useState(false);

    const [loading, setLoading] = React.useState({ value: false, tipoArquivo: "" });

    const usuario = props.usuario;

    const usuarioConversa = {
        nome: usuario.nome,
        urlFotoPerfil: usuario.urlFotoPerfil,
        id: usuario.idUsuario,
        isFreelancer: usuario.isFreelancer
    };

    const favoritar = () => {
        axiosInstance.put(`/perfis/favoritar/${usuario?.idUsuario}`)
            .then((res) => {
                props.setUsuario({
                    ...usuario,
                    isFavorito: !usuario?.isFavorito,
                    qtdFavoritos: usuario?.isFavorito ? usuario?.qtdFavoritos - 1 : usuario?.qtdFavoritos + 1
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }


    React.useEffect(() => {
        const isFreelancer = sessionStorage.getItem('funcao') === 'FREELANCER';
        const isOwnProfile = usuario.isOwnProfile;
        const isPerfilFreelancer = usuario.isPerfilFreelancer;

        const curriculoBaixarButton = (
            <BlueBackgroundButton className={styles['botaoCondicional']} valueDisabled={!usuario?.curriculo}>
                <a href={usuario?.curriculo} download>
                    currículo
                </a>
            </BlueBackgroundButton>
        )
        const curriculoUploadButton = (
            <AlterarCurriculo curriculo={usuario?.curriculo} />
        );
        const editarPerfilButton = (
            <BlueBackgroundButton className={styles['botaoCondicional']}>Editar Perfil</BlueBackgroundButton>
        );
        const conversasButton = (
            <Link to='/conversas' state={{ usuario: usuarioConversa }}>
                <EmailOutlinedIcon className={styles['icons']} sx={{ fontSize: 32 }} />
            </Link>
        );

        setPerfilFreelancer(isPerfilFreelancer)

        if (!isFreelancer && isOwnProfile) {
            setShowOptions(
                editarPerfilButton
            )
        } else if (isFreelancer && isOwnProfile) {
            setShowOptions(
                <>
                    {curriculoUploadButton}
                    {editarPerfilButton}
                </>
            )
        } else if (isFreelancer && !isOwnProfile && isPerfilFreelancer) {
            setShowOptions(
                <>
                    {conversasButton}
                    {curriculoBaixarButton}
                </>
            )
        } else if (isFreelancer && !isOwnProfile && !isPerfilFreelancer) {
            setShowOptions(
                conversasButton
            )
        } else if (!isFreelancer && !isOwnProfile && isPerfilFreelancer) {
            setShowOptions(
                <>
                    <Checkbox
                        onChange={favoritar}
                        color="error"
                        style={{ marginRight: '6px' }}
                        icon={<FavoriteBorder sx={{ fontSize: 32 }} style={{ color: '#505050' }} />}
                        checked={usuario?.isFavorito}
                        checkedIcon={<Favorite sx={{ fontSize: 32 }} />}
                    />
                    {conversasButton}
                    {curriculoBaixarButton}
                </>
            )
        } else if (!isFreelancer && !isOwnProfile && !isPerfilFreelancer) {
            setShowOptions(conversasButton)
        }

    }, [usuario])

    return (
        <>
            <div className={styles['content__banner']} style={{ backgroundImage: `url(${usuario.urlFotoWallpaper || ''})` }}>
                {
                    loading.value && loading.tipoArquivo == "WALLPAPER" &&
                    <div className={styles['content__banner-loading']} style={{ backgroundColor: '#F5F5F5' }}>
                        <CircularProgress />
                    </div>
                }

                <div className={styles['banner__imagemUsuario']}>
                    <Avatar className={styles['banner__imagem']}
                        alt={'Imagem de perfil de ' + usuario.nomeUsuario}
                        src={loading.value && loading.tipoArquivo === "PERFIL" ? '' : usuario.urlFotoPerfil}
                        sx={{ width: 150, height: 150, backgroundColor: '#F5F5F5', color: 'var(--color-textos)', fontSize: '48px' }}
                    >
                        {loading.value && loading.tipoArquivo === "PERFIL" ?
                            <CircularProgress /> :
                            usuario?.nome?.length > 0 && usuario?.nome[0]
                        }
                    </Avatar>
                    {
                        usuario.isOwnProfile &&
                        <div className={styles['banner__alterarImagem']}>
                            <AlterarImagem
                                setLoading={setLoading}
                                loading={loading}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className={styles['content__descUsuario']}>
                <div className={styles['content__infoUsuario']}>
                    <div className={styles['infoUsuario__nome']}>
                        {/* Limitar a Length da input para até 50 caracteres */}
                        <h1>{usuario?.nome}</h1>
                        {usuario?.pais &&
                            <CountryInformation pais={usuario?.pais} />
                        }
                        <div className={styles['infoUsuario__icones']}>
                            {usuario.linkLinkedin &&
                                <a href={usuario.linkLinkedin} target="_blank"><img src={LinkedinImg} alt="Ícone LinkedIn" /></a>
                            }
                            {usuario.linkGithub &&
                                <a href={usuario.linkGithub} target="_blank"><img src={GitHubImg} alt="Ícone GitHub" /></a>
                            }
                        </div>
                    </div>
                    <div className={styles['infoUsuario__desc']}>
                        {/* Limitar a Length da input para até 80 caracteres */}
                        <p>{usuario?.descricao || ""}</p>
                    </div>
                    <div className={styles['precoUsuario']}>
                        {isPerfilFreelancer &&
                            <h4>{`R$ ${(usuario?.precoMedio)}` || ""}</h4>
                        }
                    </div>
                </div>
                <div className={styles['descUsuario__button']}>
                    {showOptions}
                </div>
            </div>
        </>
    );
}

export default BannerDescUsuario;