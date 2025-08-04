// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./AdminDashboard.css"; // Importa los estilos

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const [promedios, setPromedios] = useState([]);
  const [distribuciones, setDistribuciones] = useState([]);
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.220:3000/api/admin/resultados")
      .then((res) => res.json())
      .then((data) => {
        data.promedios.forEach(p => {
          p.promedio = Number(p.promedio);
        });

        setPromedios(data.promedios);
        setDistribuciones(data.distribucion);
        setObservaciones(data.observaciones);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="admin-loading">Cargando resultados...</p>;

  // Ordenar observaciones por número de pregunta (ascendente)
  const observacionesOrdenadas = [...observaciones].sort((a, b) => {
    const numA = parseInt(a.pregunta);
    const numB = parseInt(b.pregunta);
    return numA - numB;
  });

  return (
    <div className="admin-dashboard">
      <h1>📊 Resultados de Encuesta</h1>

      {/* Promedios */}
      <h2>Promedios por Pregunta</h2>
      <div className="chart-container">
        <Bar
          data={{
            labels: promedios.map((p) => p.texto),
            datasets: [
              {
                label: "Promedio",
                data: promedios.map((p) => p.promedio.toFixed(2)),
                backgroundColor: "#36a2eb",
              },
            ],
          }}
          options={{
            indexAxis: "y",
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                min: 1,
                max: 5,
                ticks: { stepSize: 1 },
              },
              y: {
                ticks: {
                  autoSkip: false,
                  font: { size: 10 },
                },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: (tooltipItems) => tooltipItems[0].label,
                },
              },
            },
          }}
          height={promedios.length * 25}
        />
      </div>

      {/* Distribuciones */}
      <h2>Distribución por Pregunta</h2>
      <div className="distribuciones">
        {distribuciones.map((dist) => {
          const total = Object.values(dist.valores).reduce((a, b) => a + b, 0);
          if (total === 0) return null;

          return (
            <div key={dist.id} className="distribucion-item">
              <strong>{dist.texto}</strong>
              <div className="pie-container">
                <Pie
                  data={{
                    labels: ["1", "2", "3", "4", "5"],
                    datasets: [
                      {
                        label: "Respuestas",
                        data: [
                          dist.valores[1],
                          dist.valores[2],
                          dist.valores[3],
                          dist.valores[4],
                          dist.valores[5],
                        ],
                        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
                      },
                    ],
                  }}
                  options={{
                    responsive: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const val = context.parsed;
                            const pct = ((val / total) * 100).toFixed(1);
                            return `${val} respuestas (${pct}%)`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Observaciones */}
      <h2>📝 Observaciones</h2>
      <div className="observaciones">
        {observacionesOrdenadas.map((obs, i) => (
          <div key={i} className="observacion-item">
            <strong>{obs.pregunta}</strong>
            <ul>
              {obs.comentarios.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}