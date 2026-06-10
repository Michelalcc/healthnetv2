const pool = require("../config/db");

// ==========================
// DASHBOARD ADMIN
// ==========================
const getAdminStats = async () => {
  const pacientes = await pool.query("SELECT COUNT(*) FROM patients");

  const diagnosticos = await pool.query("SELECT COUNT(*) FROM diagnosticos");

  const criticos = await pool.query(`
    SELECT COUNT(*) FROM diagnosticos
    WHERE resultado = 'alto'
  `);

  return {
    pacientes: parseInt(pacientes.rows[0].count),
    diagnosticos: parseInt(diagnosticos.rows[0].count),
    criticos: parseInt(criticos.rows[0].count)
  };
};

// ==========================
// DASHBOARD POR HOSPITAL
// ==========================
const getHospitalStats = async (hospital_id) => {

  const pacientes = await pool.query(
    "SELECT COUNT(*) FROM patients WHERE hospital_id = $1",
    [hospital_id]
  );

  const diagnosticos = await pool.query(`
    SELECT COUNT(*) FROM diagnosticos d
    JOIN patients p ON d.paciente_id = p.id
    WHERE p.hospital_id = $1
  `, [hospital_id]);

  const criticos = await pool.query(`
    SELECT COUNT(*) FROM diagnosticos d
    JOIN patients p ON d.paciente_id = p.id
    WHERE p.hospital_id = $1 AND d.resultado = 'alto'
  `, [hospital_id]);

  return {
    pacientes: parseInt(pacientes.rows[0].count),
    diagnosticos: parseInt(diagnosticos.rows[0].count),
    criticos: parseInt(criticos.rows[0].count)
  };
};

module.exports = {
  getAdminStats,
  getHospitalStats
};