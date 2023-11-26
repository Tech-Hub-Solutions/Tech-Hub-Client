import React from 'react';

const LanguageLogo = ({ language, height }) => {
    const deviconClassNames = {
        // Languages
        JavaScript: "javascript",
        TypeScript: "typescript",
        Python: "python",
        Ruby: "ruby",
        Java: "java",
        C: "c",
        CPlusPlus: "cplusplus",
        CSharp: "csharp",
        PHP: "php",
        Swift: "swift",
        Go: "go",
        R: "r",
        Scala: "scala",
        Rust: "rust",
        Kotlin: "kotlin",
        Dart: "dart",
        HTML: "html5",
        CSS: "css3",
        Shell: "shell",
        ObjectiveC: "objectivec",
        Perl: "perl",
        Lua: "lua",
        Haskell: "haskell",
        Groovy: "groovy",

        // Frameworks & Libraries
        React: "react-original",
        Vue: "vuejs",
        Angular: "angularjs",
        Node: "nodejs",
        Bootstrap: "bootstrap",
        Laravel: "laravel",
        Symfony: "symfony-original",
        Django: "django",
        Flask: "flask-original",
        Express: "express-original",
        Spring: "spring",
        ".NET": "dot-net",
        Meteor: "meteor",
        Rails: "rails",

        // Tools & Databases
        Docker: "docker",
        Kubernetes: "kubernetes",
        Git: "git",
        Nginx: "nginx-original",
        Jenkins: "jenkins",
        Travis: "travis",
        MongoDB: "mongodb",
        Redis: "redis",
        PostgreSQL: "postgresql",
        MySQL: "mysql",
        SQLite: "sqlite",
        Oracle: "oracle-original",
        SQL: "mysql",
    };


    const iconName = deviconClassNames[language];

    return (
        <div style={{margin: "auto"}}>
            {
                iconName ?
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`} style={{ height: height, width: height }} />
                    :
                    <span>{language}</span>
            }
        </div>
    )
}

export default LanguageLogo;
