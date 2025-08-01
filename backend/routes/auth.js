// backend/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { connection } = require("../db");



router.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  connection.query("SELECT * FROM usuarios WHERE correo = ?", [correo], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    if (results.length === 0) {
      console.log("Correo no encontrado:", correo);
      return res.status(401).json({ error: "Correo incorrecto" });
    }

    const usuario = results[0];
    console.log("Usuario encontrado:", usuario);
    console.log("Contraseña recibida:", contrasena);
    console.log("Hash almacenado:", usuario.contraseña);

    bcrypt.compare(contrasena, usuario.contraseña, (err, esValido) => {
      if (err) {
        console.error("Error al verificar contraseña:", err);
        return res.status(500).json({ error: "Error al verificar" });
      }
      if (!esValido) {
        console.log("Contraseña incorrecta para usuario:", correo);
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({ token, rol: usuario.rol });
    });
  });
});

module.exports = router;
