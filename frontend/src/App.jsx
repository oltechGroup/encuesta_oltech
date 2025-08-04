// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Encuesta from './pages/FormularioEncuesta';
import Dashboard from './pages/AdminDashboard';

function App() {
  const rol = localStorage.getItem('rol');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {rol === 'empleado' && <Route path="/encuesta" element={<Encuesta />} />}
        {rol === 'admin' && <Route path="/admin" element={<Dashboard />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
