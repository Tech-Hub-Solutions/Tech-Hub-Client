import React from "react";
import styles from "./carrossel.module.css"

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardProjeto from "../../perfilUsuario/projetosUsuario/cardProjeto/CardProjeto";

const Carrossel = () => {

    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Slider {...settings}>
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
            <CardProjeto />
        </Slider>
    );
}

export default Carrossel;