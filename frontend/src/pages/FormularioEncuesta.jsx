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
          setMensaje("✅ Encuesta enviada con éxito. ¡Gracias por tu colaboración!");
          setYaContesto(true);
        }
      })
      .catch(() => {
        setMensaje("Error al enviar la encuesta.");
      });
  };

  const secciones = {
    "Primera parte: Aspectos Sociales": {
      "A. Ambiente de trabajo (Comunicación)": [1, 8],
      "B. Reducción del estrés (Convivencias por metas alcanzadas, cumpleaños, etc.)": [9, 16],
      "C. Prevención del síndrome de agotamiento (Permisos y flexibilidad en horarios)": [17, 23],
      "D. No discriminación (trato equitativo)": [24, 29],
    },
    "Segunda parte: Aspectos Físicos": {
      "A. Equipos": [30, 34],
      "B. Servicios": [35, 40],
      "C. Espacios de Trabajo": [41, 46],
      "D. Condiciones Ambientales": [47, 52],
    },
  };

  const renderPreguntas = (inicio, fin) => {
    const preguntasFiltradas = preguntas.filter(p => p.id >= inicio && p.id <= fin);

    return (
      <table className="tabla-encuesta">
        <thead>
          <tr>
            <th className="col-pregunta">Pregunta</th>
            <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
          </tr>
        </thead>
        <tbody>
          {preguntasFiltradas.map((pregunta) => (
            <tr key={pregunta.id}>
              <td className="texto-pregunta">
               {pregunta.texto}
              </td>
              {pregunta.tipo === "escala" ? (
                [1, 2, 3, 4, 5].map((val) => (
                  <td key={val}>
                    <input
                      type="radio"
                      name={`pregunta_${pregunta.id}`}
                      value={val}
                      checked={respuestas[`pregunta_${pregunta.id}`] === val.toString()}
                      onChange={handleChange}
                      required
                    />
                  </td>
                ))
              ) : (
                <td colSpan={5}>
                  <textarea
                    name={`pregunta_${pregunta.id}`}
                    rows="3"
                    value={respuestas[`pregunta_${pregunta.id}`] || ""}
                    onChange={handleChange}
                    required
                    placeholder="Escribe tu respuesta aquí..."
                    className="textarea-respuesta"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (cargando) return <p className="loading">Cargando...</p>;

  if (yaContesto) {
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
  }

  return (
    <div className="form-encuesta-container formulario-oficial">
      <h2 className="form-title">Encuesta Institucional</h2>
      <p className="form-text">
        Por favor, dedique unos minutos para completar esta encuesta, la información que nos proporcione ayudara a evaluar el nivel de
        satisfacción general y las condiciones de trabajo.<br />
        Sus respuestas serán utilizadas con el propósito de ayudarnos a mejorar.<br />
        <b>Instrucciones:</b> Marca con una X la respuesta que crea conveniente, tomando en cuenta que los valores representan:<br />
        5 = Siempre<br />
        4= Frecuentemente<br />
        3= Algunas veces<br />
        2= Ocasionalmente<br />
        1= Nunca
      </p>
      <form onSubmit={handleSubmit} className="form-encuesta">
        {Object.entries(secciones).map(([titulo, subBloques]) => (
          <div key={titulo} className="seccion-block">
            <h3 className="seccion-titulo">{titulo}</h3>
            {Object.entries(subBloques).map(([subtitulo, [inicio, fin]]) => (
              <div key={subtitulo} className="bloque-subseccion">
                <h4 className="seccion-subtitulo">{subtitulo}</h4>
                {renderPreguntas(inicio, fin)}
              </div>
            ))}
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
