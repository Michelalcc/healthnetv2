const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {

    const user = req.user;

    if (!user || !user.rol) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado"
      });
    }

    const { rol, hospital_id } = user;

    let pacientesQuery;
    let diagnosticosQuery;
    let criticosQuery;

    // ======================
    // ADMIN
    // ======================
    if (rol === "admin") {

      pacientesQuery = await pool.query("SELECT COUNT(*) FROM patients");
      diagnosticosQuery = await pool.query("SELECT COUNT(*) FROM diagnoses");
      criticosQuery = await pool.query("SELECT COUNT(*) FROM diagnoses WHERE nivel = 'alto'");

    } else {

      // 🔴 VALIDACIÓN CRÍTICA
      if (!hospital_id) {
        return res.status(400).json({
          ok: false,
          message: "Usuario sin hospital asignado"
        });
      }

      pacientesQuery = await pool.query(
        "SELECT COUNT(*) FROM patients WHERE hospital_id = $1",
        [hospital_id]
      );

      diagnosticosQuery = await pool.query(
        "SELECT COUNT(*) FROM diagnoses WHERE hospital_id = $1",
        [hospital_id]
      );

      criticosQuery = await pool.query(
        "SELECT COUNT(*) FROM diagnoses WHERE hospital_id = $1 AND nivel = 'alto'",
        [hospital_id]
      );
    }

    return res.json({
      ok: true,
      data: {
        pacientes: parseInt(pacientesQuery.rows[0].count),
        diagnosticos: parseInt(diagnosticosQuery.rows[0].count),
        criticos: parseInt(criticosQuery.rows[0].count)
      }
    });

  } catch (error) {

    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      ok: false,
      message: "Error dashboard",
      error: error.message
    });
  }
};

module.exports = { getDashboard };