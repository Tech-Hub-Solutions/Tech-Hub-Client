import styles from './listaDeConversa.module.css'
import { Box, Skeleton } from "@mui/material"

const ListaDeConversaSkeleton = () => {
    return (
        <div className={styles['lista-de-conversa']}>
            <div className={styles['lista-de-conversa__header']}>
                <Skeleton variant="text" width={120} height={40} />
            </div>

            <div className={styles['lista-de-conversa__pesquisa']}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Skeleton variant="rectangular" width={'80%'} height={30} />
                </Box>
            </div>
            <div className={styles['lista-de-conversa__conversas']}>
                <Box width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {
                        Array(5).fill().map((_, index) => (
                            <Skeleton variant="rectangular" width="100%" height={60} key={`conversa-${index}`} />
                        ))
                    }
                </Box>
            </div>
        </div>
    )
}

export default ListaDeConversaSkeleton