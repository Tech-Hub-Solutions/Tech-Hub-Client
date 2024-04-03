import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Institucional from "./pages/institucional/Institucional";
import Conversas from "./pages/conversas/Conversas";
import Teste from "./pages/conversas/Teste";
import PerfilUsuario from "./pages/perfilUsuario/PerfilUsuario";
import BuscaTalentos from "./pages/buscaTalentos/BuscaTalentos";
import Favoritos from "./pages/favoritos/Favoritos";
import NotFound from "./pages/errors/NotFound";
import GenericError from "./pages/errors/GenericError";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Institucional />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/busca-talentos" element={<BuscaTalentos />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="error/:code/:message" element={<GenericError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
