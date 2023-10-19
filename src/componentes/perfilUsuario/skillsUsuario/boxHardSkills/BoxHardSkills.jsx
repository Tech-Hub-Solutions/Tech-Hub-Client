import React from "react";
import styles from "./boxHardSkills.module.css"
import WidgetHardSkills from "../widgetHardSkills/WidgetHardSkills";

const BoxHardSkills = (props) => {

    // const [repositorios, setRepositorios] = React.useState([]);

    const [hardSkills, setHardSkills] = React.useState([{
        nome: 'ReactJs',
        categoria: 'frontend'
    },
    {
        nome: 'Java',
        categoria: 'backend'
    },
    {
        nome: 'PostgreeSQL',
        categoria: 'database'
    },
    {
        nome: 'PyTorch',
        categoria: 'testes'
    },
    {
        nome: 'NumPy',
        categoria: 'analise-dados'
    },
    {
        nome: 'Python',
        categoria: 'analise-dados'
    },
    {
        nome: 'Angular',
        categoria: 'frontend'
    },
    {
        nome: 'VueJs',
        categoria: 'frontend'
    }
    ]);

    React.useEffect(() => {
        const newSkills = hardSkills.map((skill) => {
            // map varre a lista e transforma o json antigo em um novo

            let background;

            switch (skill.categoria) {

                case 'frontend':
                    background = "var(--color-frontend)"
                    break;
                case 'backend':
                    background = "var(--color-backend)"
                    break;
                case 'mobile':
                    background = "var(--color-mobile)";
                    break;
                case 'database':
                    background = "var(--color-database)";
                    break;
                case 'testes':
                    background = "var(--color-testes)";
                    break;
                case 'analise-dados':
                    background = "var(--color-analiseDados)";
                    break;
                case 'devops':
                    background = "var(--color-devops)";
                    break;
                case 'ia':
                    background = "var(--color-ia)";
                    break;
                case 'seguranca':
                    background = "var(--color-seguranca)";
                    break;
            }

            return {
                ...skill, // Pega todos os atributos do json que já existem.
                background // adiciona novo atributo com base na variável background
            }
        })

        setHardSkills(newSkills);

    }, []);


    // const pegarDados = () => {
    //     const nomeGit = 'LuiFiller';

    //     axios.get(`https://api.github.com/users/${nomeGit}/repos`)
    //         .then(async (resposta) => {
    //             if (resposta.status == 200) {
    //                 const repositorios = resposta.data;
    //                 const listaRepositorio = []

    //                 for (const repositorio in repositorios) {

    //                     const nome = repositorio.name;
    //                     const descricao = repositorio.description;

    //                     let linguagens;

    //                     await axios.get(`https://api.github.com/repos/luifiller/${nome}/languages`)
    //                         .then(res => {
    //                             linguagens = res.data;

    //                         })
    //                         .catch((error) => {
    //                             console.log(error);
    //                         })

    //                     const json = {
    //                         nome,
    //                         descricao,
    //                         linguagens
    //                     }

    //                     listaRepositorio.push(json);
    //                 }


    //                 setRepositorios(listaRepositorio);


    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    return (
        <div>
            <h1 className={styles['titulo']}>Hard Skill</h1>
            <div className={styles['boxSkills']}>
                {
                    hardSkills.map((skill, index) => {
                        return (
                            <WidgetHardSkills background={skill.background} key={`hardskill${index}`} hardSkill={skill.nome} />
                        )
                    })
                }
            </div>
            {/* {
                repositorios.map((repo, index) => {
                    return (
                        <>
                            <p>{repo.nome}</p>
                            <p>{repo.descricao}</p>

                            {
                                repo.linguagens &&
                                Object.keys(repo.linguagens).map((key, index) => {
                                    return (
                                        <p key={`LINGUAGEM${key + index}`}>{key}</p>
                                    )
                                })
                            }

                        </>
                    )
                })
            } */}
        </div>
    );
}

export default BoxHardSkills;