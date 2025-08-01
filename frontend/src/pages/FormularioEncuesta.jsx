import { useState, useEffect } from "react";

export default function FormularioEncuesta() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [yaContesto, setYaContesto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token");

  // Ocultar mensaje después de 7 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    if (!token) return;

    // Verificar si ya contestó
    fetch("http://localhost:3000/api/encuesta/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.contesto) {
          setYaContesto(true);
          setCargando(false);
        } else {
          // Obtener preguntas
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

    // Validar que todas las preguntas tengan respuesta
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

  if (cargando) return <p>Cargando...</p>;

  if (yaContesto)
    return (
      <div>
        <p>⚠️ Ya has contestado la encuesta. No puedes volver a responderla.</p>
        <button onClick={() => window.location.reload()}>Refrescar</button>
        {mensaje && (
          <p style={{ color: "green", fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
            {mensaje}
          </p>
        )}
      </div>
    );

  return (
    <div>
      <h2>Encuesta para Empleados</h2>
      <form onSubmit={handleSubmit}>
        {preguntas.map((pregunta) => (
          <div key={pregunta.id} style={{ marginBottom: "1.5rem" }}>
            <p><strong>{pregunta.texto}</strong></p>
            {pregunta.tipo === "escala" ? (
              [...Array(5)].map((_, i) => {
                const val = i + 1;
                return (
                  <label key={val}>
                    <input
                      type="radio"
                      name={`pregunta_${pregunta.id}`}
                      value={val}
                      checked={respuestas[`pregunta_${pregunta.id}`] === val.toString()}
                      onChange={handleChange}
                      required
                    />{" "}
                    {val}
                  </label>
                );
              })
            ) : (
              <textarea
                name={`pregunta_${pregunta.id}`}
                rows="3"
                cols="60"
                value={respuestas[`pregunta_${pregunta.id}`] || ""}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Enviar Encuesta</button>
      </form>

      {mensaje && (
        <p style={{ color: "green", fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
