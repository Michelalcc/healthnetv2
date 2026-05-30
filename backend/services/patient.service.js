const pool = require("../config/db");

// ==========================
// CREAR PACIENTE (PRO SAFE)
// ==========================
const createPatient = async (data) => {
  try {
    const query = `
      INSERT INTO patients 
      (nombre, dni, edad, sexo, hospital_id, doctor_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      data.nombre,
      data.dni,
      data.edad,
      data.sexo,
      data.hospital_id,
      data.doctor_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];

  } catch (error) {

    // =========================
    // DUPLICADO DNI
    // =========================
    if (error.code === "23505") {
      throw new Error("DNI ya registrado en el sistema");
    }

    console.error("DB CREATE PATIENT ERROR:", error);
    throw new Error("Error al crear paciente en base de datos");
  }
};

// ==========================
// PACIENTES POR HOSPITAL
// ==========================
const getPatientsByHospital = async (hospital_id) => {
  try {
    const query = `
      SELECT * FROM patients
      WHERE hospital_id = $1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [hospital_id]);
    return result.rows;

  } catch (error) {
    console.error("DB GET BY HOSPITAL ERROR:", error);
    throw new Error("Error al obtener pacientes por hospital");
  }
};

// ==========================
// TODOS LOS PACIENTES (ADMIN)
// ==========================
const getAllPatients = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM patients
      ORDER BY created_at DESC
    `);

    return result.rows;

  } catch (error) {
    console.error("DB GET ALL PATIENTS ERROR:", error);
    throw new Error("Error al obtener todos los pacientes");
  }
};

module.exports = {
  createPatient,
  getPatientsByHospital,
  getAllPatients
};