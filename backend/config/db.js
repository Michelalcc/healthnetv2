const { Pool } = require("pg");

const pool = new Pool({
  user: "michelalfonzoc",
  host: "localhost",
  database: "healthnetv2",
  password: "hn1234", // cambia si tu postgres tiene otra clave
  port: 5432,
});

pool.connect()
  .then(() => console.log("🟢 Conectado a PostgreSQL"))
  .catch((err) => console.error("🔴 Error DB:", err));

module.exports = pool;