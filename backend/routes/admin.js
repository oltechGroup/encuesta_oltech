// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db');  // Importa pool con destructuración

router.get('/admin/resultados', async (req, res) => {
  try {
    // 1. Promedios por pregunta (escala)
    const [promedios] = await pool.execute(`
      SELECT p.id, p.texto, AVG(r.respuesta_escala) as promedio
      FROM preguntas p
      JOIN respuestas r ON p.id = r.id_pregunta
      WHERE p.tipo = 'escala'
      GROUP BY p.id
      ORDER BY p.id
    `);

    // 2. Distribución
    const [distRaw] = await pool.execute(`
      SELECT p.id AS id_pregunta, p.texto, r.respuesta_escala, COUNT(*) as cantidad
      FROM preguntas p
      LEFT JOIN respuestas r ON p.id = r.id_pregunta AND p.tipo = 'escala'
      WHERE p.tipo = 'escala'
      GROUP BY p.id, r.respuesta_escala
      ORDER BY p.id
    `);

    const distribucion = {};
    for (const row of distRaw) {
      const { id_pregunta, texto, respuesta_escala, cantidad } = row;
      if (!distribucion[id_pregunta]) {
        distribucion[id_pregunta] = {
          id: id_pregunta,
          texto,
          valores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }
      if (respuesta_escala >= 1 && respuesta_escala <= 5) {
        distribucion[id_pregunta].valores[respuesta_escala] = parseInt(cantidad);
      }
    }

    // Convierte distribucion a array para frontend
    const distribucionArray = Object.values(distribucion);

    // 3. Observaciones
    const [obsRows] = await pool.execute(`
      SELECT p.texto AS pregunta,
             GROUP_CONCAT(r.respuesta_texto SEPARATOR '||--||') AS comentarios
      FROM preguntas p
      JOIN respuestas r ON p.id = r.id_pregunta
      WHERE p.tipo = 'observacion'
      GROUP BY p.id
      ORDER BY p.id DESC
    `);

    const observaciones = obsRows.map(row => ({
      pregunta: row.pregunta,
      comentarios: row.comentarios ? row.comentarios.split('||--||') : []
    }));

    res.json({
      promedios,
      distribucion: distribucionArray,
      observaciones
    });
  } catch (error) {
    console.error("Error en /admin/resultados:", error);
    res.status(500).json({ error: "Error obteniendo resultados" });
  }
});

module.exports = router;
