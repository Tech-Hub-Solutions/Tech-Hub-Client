import axiosInstance from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Teste = () => {
    
    const [usuarios, setUsuarios] = useState([]); 

    useEffect(() => {
        axiosInstance.get('/usuarios/teste').then(({ data }) => {
      
            setUsuarios(data.vetor.filter(usuario => usuario !== null));
        });
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <Link to={`/conversas`} 
                        state={{ usuario }}
                        >
                            {usuario.nome}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Teste;