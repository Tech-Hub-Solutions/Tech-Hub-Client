import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institucional from './pages/institucional/Institucional'
import Conversas from './pages/conversas/Conversas'
import Teste from './pages/conversas/Teste';
import PerfilUsuario from './pages/perfilUsuario/PerfilUsuario';
import Projetos from './componentes/perfilUsuario/projetosUsuario/Projetos';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Institucional />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/github" element={<Projetos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
