// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
const encuestaRoutes = require("./routes/encuesta");
app.use("/api", encuestaRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api", adminRoutes);



// Conexión base de datos
require("./db");

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Servidor corriendo en http://0.0.0.0:3000");
});

