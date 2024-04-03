import { Box, Skeleton } from "@mui/material"
import styles from './conversaContent.module.css'

const ConversaContentSkeleton = () => {
    return (
        <div className={styles['conversa-content']} >
            <div className={styles['conversa-content__header']}>
                <div className={styles['conversa-content__header__info']}>
                    <div className={styles['conversa-content__header__info__foto']}>
                        <Skeleton variant="circular" width={56} height={56} />
                    </div>
                    <div className={styles['conversa-content__header__info__nome']}>
                        <Skeleton variant="text" width={200} height={40} />
                    </div>
                </div>
                <Skeleton variant="rectangular" width={40} height={40} />
            </div>
            <div className={styles['conversa-content__mensagens']}>
                <Box width="100%" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {Array(7).fill().map((_, index) => (
                        <Skeleton variant="rectangular" width="25%" height={40} key={`mensagem-${index}`} 
                            sx={{ alignSelf: index % 2 == 0 ? 'flex-start' : 'flex-end' }}                        
                        />
                    ))}
                </Box>
            </div>
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ margin: '0 auto' }} />
        </div>
    )
}

export default ConversaContentSkeleton