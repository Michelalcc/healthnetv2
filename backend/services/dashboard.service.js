const pool = require("../config/db");

const getStats = async () => {
  const pacientes = await pool.query("SELECT COUNT(*) FROM pacientes");

  const doctores = await pool.query(
    "SELECT COUNT(*) FROM usuarios WHERE rol = 'doctor'"
  );

  const especialistas = await pool.query(
    "SELECT COUNT(*) FROM usuarios WHERE rol = 'especialista'"
  );

  return {
    pacientes: pacientes.rows[0].count,
    doctores: doctores.rows[0].count,
    especialistas: especialistas.rows[0].count
  };
};

module.exports = {
  getStats
};