import React, { useEffect } from 'react';
import styles from './projetos.module.css'
import ProjetosLoadingBox from './ProjetosLoadingBox';
import ProjetosCard from './ProjetosCard/ProjetosCard';
import { GitHub } from '@mui/icons-material';
import axios from 'axios';

const Projetos = ({ nomeGitHub }) => {

    const [repositorios, setRepositorios] = React.useState({ error: false, data: [] });
    const [loading, setLoading] = React.useState(false);

    
    useEffect(() => {
        if (nomeGitHub == null || nomeGitHub == "") return;

        axios.get(`https://api.github.com/users/${nomeGitHub}/repos`)
            .then(response => {
                if (response.status === 200) {
                    alert("Pesquisando")
                    const repoPromises = response.data.map((repo) => {
                        const name = repo.name;
                        const description = repo.description;
                        const language = repo.language;
                        const url = repo.html_url;

                        return axios.get(`https://api.github.com/repos/${nomeGitHub}/${name}/languages`)
                            .then(languageResponse => {
                                const languagens = Object.keys(languageResponse.data);
                                return { name, description, language, languagens, url };
                            });
                    });

                    Promise.all(repoPromises)
                        .then(allRepos => {
                            setRepositorios({ error: false, data: allRepos });
                        })
                } else {
                    setRepositorios({ error: response.status, data: [] });
                }
            }).catch(error => {
                setRepositorios({ error: error.response.status, data: [] });
            })
            .finally(() => {
                setLoading(false);
            })
    }, [nomeGitHub]);

    return (
        <div className={styles["projetos"]}>
            <div className={styles['projetos__titulo']}>
                <h1>Projetos Desenvolvidos</h1>
                <GitHub />
            </div>
            <div className={styles['projetos__lista']}>
                {loading ?
                    (Array.from(new Array(4))).map((_, index) => (
                        <ProjetosLoadingBox key={`loading${index}`} />
                    ))
                    :
                    (repositorios.error || repositorios.data.length == 0) ?
                        <div className={styles['projetos__lista__mensagem-error']}>
                            <p>
                                {repositorios.error == 403 ? "Serviço temporariamente indisponível"
                                    : "Usuário não encontrado ou não possui repositórios públicos"
                                }
                            </p>
                        </div>
                        :
                        repositorios.data.map((repo, index) => (
                            <ProjetosCard key={`repositorio${repo}${index}`} repositorio={repo} />
                        ))
                }
            </div>
        </div>

    );
}

export default Projetos;