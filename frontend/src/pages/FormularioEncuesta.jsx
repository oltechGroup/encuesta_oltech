import { useState, useEffect } from "react";
import "./formulario.css";

export default function FormularioEncuesta() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [yaContesto, setYaContesto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3000/api/encuesta/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.contesto) {
          setYaContesto(true);
          setCargando(false);
        } else {
          fetch("http://localhost:3000/api/preguntas", {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => {
              setPreguntas(data);
              setCargando(false);
            })
            .catch(() => {
              setMensaje("Error al cargar preguntas");
              setCargando(false);
            });
        }
      })
      .catch(() => {
        setMensaje("Error al verificar estado de la encuesta.");
        setCargando(false);
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    for (const pregunta of preguntas) {
      if (!respuestas[`pregunta_${pregunta.id}`]) {
        setMensaje("Por favor responde todas las preguntas.");
        return;
      }
    }

    fetch("http://localhost:3000/api/encuesta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(respuestas),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          setMensaje("✅ Encuesta enviada con éxito. ¡Gracias por participar!");
          setYaContesto(true);
        }
      })
      .catch(() => {
        setMensaje("Error al enviar la encuesta.");
      });
  };

  if (cargando) return <p className="loading">Cargando...</p>;

  if (yaContesto)
    return (
      <div className="ya-contesto-container">
        <p className="ya-contesto-msg">
          ⚠️ Ya has contestado la encuesta. No puedes volver a responderla.
        </p>
        <button className="btn" onClick={() => window.location.reload()}>
          Refrescar
        </button>
        {mensaje && <p className="mensaje success">{mensaje}</p>}
      </div>
    );

  return (
    <div className="form-encuesta-container">
      <h2 className="form-title">Encuesta para Empleados</h2>
      <form onSubmit={handleSubmit} className="form-encuesta">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} className="pregunta-block">
            <p className="pregunta-texto">
              <strong>{pregunta.texto}</strong>
            </p>
            {pregunta.tipo === "escala" ? (
              <div className="escala-opciones">
                {[...Array(5)].map((_, i) => {
                  const val = i + 1;
                  return (
                    <label key={val} className="radio-label">
                      <input
                        type="radio"
                        name={`pregunta_${pregunta.id}`}
                        value={val}
                        checked={respuestas[`pregunta_${pregunta.id}`] === val.toString()}
                        onChange={handleChange}
                        required
                        className="radio-input"
                      />
                      {val}
                    </label>
                  );
                })}
              </div>
            ) : (
              <textarea
                name={`pregunta_${pregunta.id}`}
                rows="3"
                className="textarea-respuesta"
                value={respuestas[`pregunta_${pregunta.id}`] || ""}
                onChange={handleChange}
                required
                placeholder="Escribe tu respuesta aquí..."
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-submit">
          Enviar Encuesta
        </button>
      </form>

      {mensaje && <p className="mensaje success">{mensaje}</p>}
    </div>
  );
}
