import { useState, useEffect } from "react";
import FormularioEncuesta from "./FormularioEncuesta";
import AdminDashboard from "./AdminDashboard";

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

  // === Roles ===

  if (token && rol === "empleado") {
    return (
      <div>
        <h2>Bienvenido, empleado</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <FormularioEncuesta />
      </div>
    );
  }

  if (token && rol === "admin") {
    return (
      <div>
        <h2>Bienvenido, administrador</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <AdminDashboard />
      </div>
    );
  }

  if (token && !["empleado", "admin"].includes(rol)) {
    return (
      <div>
        <h2>No tienes acceso</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

  // === Formulario de login ===

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
