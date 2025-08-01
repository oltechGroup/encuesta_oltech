const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/auth"); // Reutilizamos middleware externo
const { connection } = require('../db');

// GET /api/preguntas -> obtener todas las preguntas
router.get("/preguntas", verificarToken, (req, res) => {
  connection.query("SELECT id, texto, tipo FROM preguntas ORDER BY id", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.json(results);
  });
});

// GET /api/encuesta/status -> saber si ya respondió la encuesta
router.get("/encuesta/status", verificarToken, (req, res) => {
  const id_usuario = req.user.id; // ✅ CORREGIDO: extraer solo el ID

  connection.query(
    "SELECT COUNT(*) AS total FROM respuestas WHERE id_usuario = ?",
    [id_usuario],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      const contesto = results[0].total > 0;
      res.json({ contesto });
    }
  );
});

// POST /api/encuesta -> guardar respuestas
router.post("/encuesta", verificarToken, (req, res) => {
  const id_usuario = req.user.id; // ✅ CORREGIDO
  const respuestas = req.body; // ej: { pregunta_1: "3", pregunta_2: "texto" }

  // Verificar si ya respondió antes
  connection.query(
    "SELECT COUNT(*) AS total FROM respuestas WHERE id_usuario = ?",
    [id_usuario],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error en la base de datos" });
      if (results[0].total > 0) return res.status(400).json({ error: "Ya contestaste la encuesta" });

      // Insertar respuestas
      const promesas = [];

      for (const key in respuestas) {
        if (key.startsWith("pregunta_")) {
          const id_pregunta = key.replace("pregunta_", "");
          const valor = respuestas[key];

          promesas.push(new Promise((resolve, reject) => {
            // Obtener el tipo de la pregunta
            connection.query(
              "SELECT tipo FROM preguntas WHERE id = ?",
              [id_pregunta],
              (err, result) => {
                if (err) return reject(err);
                if (!result.length) return resolve(); // por si no existe la pregunta

                const tipo = result[0].tipo;
                let sql, params;

                if (tipo === "escala") {
                  sql = "INSERT INTO respuestas (id_usuario, id_pregunta, respuesta_escala) VALUES (?, ?, ?)";
                  params = [id_usuario, id_pregunta, valor];
                } else if (tipo === "observacion") {
                  sql = "INSERT INTO respuestas (id_usuario, id_pregunta, respuesta_texto) VALUES (?, ?, ?)";
                  params = [id_usuario, id_pregunta, valor];
                } else {
                  return resolve(); // tipo desconocido, lo ignoramos
                }

                connection.query(sql, params, (err2) => {
                  if (err2) return reject(err2);
                  resolve();
                });
              }
            );
          }));
        }
      }

      Promise.all(promesas)
        .then(() => {
          res.json({ mensaje: "Encuesta guardada correctamente" });
        })
        .catch(() => {
          res.status(500).json({ error: "Error al guardar respuestas" });
        });
    }
  );
});

module.exports = router;
