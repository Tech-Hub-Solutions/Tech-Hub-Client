import React from 'react';
import { Box, Skeleton, } from '@mui/material';

const ProjetosLoadingBox = () => {
    const stylesMui = {
        loaddingBox: { marginRight: "1rem", my: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" },
        loadingLanguages: { pt: 0.5, display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }
    }

    return (
        <Box sx={stylesMui.loaddingBox}>
            <Skeleton width={"7rem"} />

            <Skeleton width={"17rem"} />
            <Skeleton width={"17rem"} />
            <Skeleton width={"17rem"} />
            <Skeleton width={"17rem"} />
            <Skeleton width={"17rem"} />

            <Box sx={stylesMui.loadingLanguages} >
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
            </Box>
        </Box>
    );
}

export default ProjetosLoadingBox;