// backend/db.js
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const dotenv = require("dotenv");

dotenv.config();

// Conexión tradicional para callbacks
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa!');
});

// Pool para promesas y async/await
const pool = mysqlPromise.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exportas ambos para usarlos donde quieras:
module.exports = {
  connection, // para callbacks
  pool,       // para async/await con execute
};
