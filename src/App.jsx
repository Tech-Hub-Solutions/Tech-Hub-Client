import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Institucional from './pages/institucional/Institucional'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Institucional />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
