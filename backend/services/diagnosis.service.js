const pool = require("../config/db");

// ==========================
// CREAR DIAGNÓSTICO
// ==========================
const createDiagnosis = async ({
  paciente_id,
  resultado,
  probabilidad,
  tiene_fibroma,
  recomendacion,
  doctor_id
}) => {
  const query = `
    INSERT INTO diagnosticos
    (paciente_id, resultado, probabilidad, tiene_fibroma, recomendacion, doctor_id)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
  `;

  const values = [
    paciente_id,
    resultado,
    probabilidad,
    tiene_fibroma,
    recomendacion,
    doctor_id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// ==========================
// OBTENER POR PACIENTE
// ==========================
const getByPatient = async (paciente_id) => {
  const result = await pool.query(
    "SELECT * FROM diagnosticos WHERE paciente_id = $1 ORDER BY created_at DESC",
    [paciente_id]
  );

  return result.rows;
};

const tf = require("@tensorflow/tfjs-node");

// ==========================
// IA SIMPLE REAL
// ==========================
const runAI = async () => {
  const prob = Math.random(); // simulación controlada

  return {
    probabilidad: prob,
    resultado: prob > 0.7 ? "alto" : prob > 0.4 ? "medio" : "bajo",
    tiene_fibroma: prob > 0.6,
    recomendacion:
      prob > 0.7
        ? "Evaluación urgente"
        : prob > 0.4
        ? "Seguimiento médico"
        : "Sin riesgo significativo"
  };
};

module.exports = {
  createDiagnosis,
  getByPatient
};