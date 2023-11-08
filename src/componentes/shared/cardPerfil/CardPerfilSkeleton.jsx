import React from "react";
import { Box, Skeleton } from "@mui/material";

const CardPerfilSketon = () => {

    const stylesMui = {
        loaddingBox: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2.5rem",
            width: "100%",
            height: "100%",
        },
        imagem: {
            height: "12rem",
            width: "100%",
        },
        textos: {
            width: "100%",
        },
        flex: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "0.2rem",
        }
    }

    return (
        <div style={stylesMui.loaddingBox}>
            <Skeleton variant="rectangular" style={stylesMui.imagem} />
            <div style={stylesMui.textos}>
                <Skeleton height={'15%'} width={"40%"} />
                <Skeleton height={'15%'} width={"100%"} />
                <Skeleton height={'15%'} width={"100%"} />
                <Skeleton height={'15%'} width={"100%"} />
                <Skeleton height={'15%'} width={"100%"} />
                <Skeleton height={'15%'} width={"100%"} />
            </div>
            <div style={stylesMui.flex} >
                <Skeleton height={'100%'} width={"70%"} />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
        </div>
    );
}

export default CardPerfilSketon;