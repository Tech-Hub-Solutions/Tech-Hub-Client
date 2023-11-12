import { Box, Divider, Skeleton } from "@mui/material";
import React from "react";
import styles from '../../../pages/perfilUsuario/PerfilUsuario.module.css';

const PerfilSkeleton = () => {
    return (
        <div className={styles['perfil__usuario']}>
            <div className={styles['content']} style={{ maxWidth: '1280px' }}>
                <div className={styles['content__banner']}>
                    <Box width="100%" height={180} sx={
                        {
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} style={{ position: "absolute", top: 0, left: 0 }} />
                        <Skeleton variant="circular" width={150} height={150} style={{ position: "absolute", bottom: -100, left: 50 }} />
                    </Box>
                    <Box width="100%" height={130} sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 0,
                        marginLeft: '16rem'
                    }}>
                        <Box width={'100%'} height={60} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                            <Skeleton variant="text" width={200} height={40} />
                            <Skeleton variant="rectangular" width={80} height={25} />
                            <Skeleton variant="rectangular" width={25} height={25} />
                            <Skeleton variant="rectangular" width={25} height={25} />
                        </Box>

                        <Skeleton variant="text" width={700} height={20} />
                        <Skeleton variant="text" width={700} height={20} />
                    </Box>
                </div>
                <div className={styles['content__sectionSkills']}>
                    <div className={styles['sectionSkills__experiencia']}>
                        <Box width="100%" height={'100%'}  >
                            <Skeleton variant="text" width={'20%'} height={40} />
                            <Skeleton variant="text" width={'100%'} height={20} />
                            <Skeleton variant="text" width={'100%'} height={20} />
                            <Skeleton variant="text" width={'50%'} height={20} />
                        </Box>
                        <Divider variant="middle" style={{ margin: '16px 0' }} />
                        <Box width="100%" height={'100%'}  >
                            <Skeleton variant="text" width={'20%'} height={40} />
                            <Skeleton variant="text" width={'100%'} height={20} />
                            <Skeleton variant="text" width={'100%'} height={20} />
                            <Skeleton variant="text" width={'50%'} height={20} />
                        </Box>                    </div>
                    <div className={styles['sectionSkills__experiencia']}>
                        <div className={styles['boxSkills']}>
                            <Box width="100%" height={'100%'} >
                                <Skeleton variant="text" width={'20%'} height={40} />
                                <Box width="100%" height={70} sx={{ display: "flex", flexWrap: 'wrap', alignItems: "center", justifyContent: "flex-start", columnGap: 1 }}>
                                    {
                                        Array.from(Array(10).keys()).map((__, index) => {
                                            return (
                                                <Skeleton key={index} variant="text" width={88} height={40} />
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </div>
                        <Divider variant="middle" style={{ margin: '16px 0' }} />
                        <Skeleton variant="text" width={'20%'} height={40} />
                        <Box width="100%" height={70} sx={{ display: "flex", flexWrap: 'wrap', alignItems: "center", justifyContent: "flex-start", columnGap: 1 }}>
                            {
                                Array.from(Array(10).keys()).map((__, index) => {
                                    return (
                                        <Skeleton key={index} variant="text" width={88} height={40} />
                                    )
                                })
                            }
                        </Box>
                    </div>
                </div>
                <div className={styles['content__sectionComentariosAvaliacoes']}>
                    <div className={styles['sectionComentariosAvaliacoes__comentarios']}>
                        <Skeleton variant="text" width={150} height={40} />
                        <Box width="100%" height={'100%'} sx={{ marginTop: 4, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 8 }}>
                            {
                                Array.from(Array(3).keys()).map((__, index) => (
                                    <Box key={index} width="100%" height={120} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", columnGap: 2 }}>
                                        <Skeleton variant="circular" width={50} height={50} />
                                        <Box width="80%" height={'100%'} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", columnGap: 1 }}>
                                            <Skeleton variant="text" width={140} height={40} />
                                            <Box width="100%" height={70} sx={{ display: "flex", flexWrap: 'wrap', alignItems: "center", justifyContent: "flex-start", columnGap: 1 }}>
                                                {
                                                    Array.from(Array(5).keys()).map((__, index) => (
                                                        <Skeleton key={index} variant="rectangular" width={20} height={20} />
                                                    ))
                                                }
                                            </Box>
                                            <Skeleton variant="text" width={'100%'} height={20} />
                                            <Skeleton variant="text" width={'100%'} height={20} />
                                        </Box>
                                    </Box>
                                )
                                )
                            }
                        </Box>
                    </div>
                    <Divider orientation="vertical" flexItem style={{ margin: '0 36px' }}></Divider>
                    <div className={styles['sectionComentariosAvaliacoes__avaliacoes']}>
                        <Skeleton variant="text" width={150} height={40} />
                        <div className={styles['avaliacoesUsuario']}>
                            {
                                Array.from(Array(3).keys()).map((__, index) => (
                                    <Skeleton key={index} variant="text" width={'100%'} height={20} sx={{ marginBottom: 2 }} />
                                ))
                            }
                            < Skeleton variant="text" width={'40%'} height={20} />

                        </div>
                        <Divider variant="middle" style={{ width: '100%', margin: '40px 0' }} />
                        <div className={styles['avaliacoesUsuario']}>
                            {
                                Array.from(Array(3).keys()).map((__, index) => (
                                    <Skeleton key={index} variant="text" width={'100%'} height={20} sx={{ marginBottom: 2 }} />
                                ))
                            }
                            < Skeleton variant="text" width={'40%'} height={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfilSkeleton;