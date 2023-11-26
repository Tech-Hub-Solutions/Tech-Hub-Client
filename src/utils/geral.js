import Resizer from 'react-image-file-resizer';

export const formatarBytes = (bytes, decimal) => {
    if (bytes == 0) return '0 Bytes';

    const k = 1024;
    const dm = decimal <= 0 ? 0 : decimal || 2;
    const tamanhos = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + tamanhos[i];
}

export const resizeImage = (file, callBack) => {
    Resizer.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        70,
        0,
        callBack,
        'blob'
    );
}

export const verificarCorflag = (flag) => {
    let background;

    switch ((flag.area).toLowerCase()) {

        case 'front-end':
            background = "var(--color-frontend)"
            break;
        case 'back-end':
            background = "var(--color-backend)"
            break;
        case 'mobile':
            background = "var(--color-mobile)";
            break;
        case 'banco de dados':
            background = "var(--color-database)";
            break;
        case 'testes':
            background = "var(--color-testes)";
            break;
        case 'análise de dados':
            background = "var(--color-analiseDados)";
            break;
        case 'devops':
            background = "var(--color-devops)";
            break;
        case 'inteligência artificial':
            background = "var(--color-ia)";
            break;
        case 'segurança':
            background = "var(--color-seguranca)";
            break;
        case 'soft-skills':
            background = "var(--color-softSkills)";
            break;

    }

    return background;
}
