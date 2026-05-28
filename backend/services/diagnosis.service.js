const pool = require("../config/db");

const createDiagnosis = async ({
  paciente_id,
  resultado,
  probabilidad,
  tiene_fibroma,
  recomendacion
}) => {
  const query = `
    INSERT INTO diagnosticos
    (paciente_id, resultado, probabilidad, tiene_fibroma, recomendacion)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
  `;

  const values = [
    paciente_id,
    resultado,
    probabilidad,
    tiene_fibroma,
    recomendacion
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  createDiagnosis
};