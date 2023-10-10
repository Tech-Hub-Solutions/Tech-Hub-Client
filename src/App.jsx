import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institucional from './pages/institucional/Institucional'
import PerfilUsuario from './pages/perfilUsuario/PerfilUsuario';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Institucional />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
