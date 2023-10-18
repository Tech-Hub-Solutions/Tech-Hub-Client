import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institucional from './pages/institucional/Institucional'
import Conversas from './pages/conversas/Conversas'
import Teste from './pages/conversas/Teste';
import PerfilUsuario from './pages/perfilUsuario/PerfilUsuario';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Institucional />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
