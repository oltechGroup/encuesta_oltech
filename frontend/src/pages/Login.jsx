import { useState, useEffect } from "react";
import FormularioEncuesta from "./FormularioEncuesta";
import AdminDashboard from "./AdminDashboard";
import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRol = localStorage.getItem("rol");
    if (savedToken && savedRol) {
      setToken(savedToken);
      setRol(savedRol);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      setToken(data.token);
      setRol(data.rol);
    } else {
      alert("Error: " + data.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setToken(null);
    setRol(null);
    setCorreo("");
    setContrasena("");
  };

  if (token && rol === "empleado") {
    return (
      
      <div className="bienvenida-container">
         <header className="bienvenida-header-row">
          <img src="/src/assets/oltech.png" alt="Logo" className="logo-bienvenida" />
          <h2 className="titulo-bienvenida">Bienvenido, Empleado</h2>
          <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
        </header>
        <FormularioEncuesta />
      </div>
    );
  }

  if (token && rol === "admin") {
    return (
      <div className="bienvenida-container">
        <header className="bienvenida-header-row">
          <img src="/src/assets/oltech.png" alt="Logo" className="logo-bienvenida" />
          <h2 className="titulo-bienvenida">Bienvenido, Administrador</h2>
          <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
        </header>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>

  );
}
