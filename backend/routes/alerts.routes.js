const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const pool = require("../config/db");

router.get("/", auth, async (req, res) => {
  try {

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado"
      });
    }

    const { rol, hospital_id } = user;

    let result;

    // ======================
    // ADMIN
    // ======================
    if (rol === "admin") {

      result = await pool.query(
        "SELECT * FROM alerts ORDER BY created_at DESC LIMIT 10"
      );

    } else {

      if (!hospital_id) {
        return res.json({
          ok: true,
          data: []
        });
      }

      result = await pool.query(
        "SELECT * FROM alerts WHERE hospital_id = $1 ORDER BY created_at DESC LIMIT 10",
        [hospital_id]
      );
    }

    return res.json({
      ok: true,
      data: result.rows || []
    });

  } catch (error) {

    console.error("ALERTS ERROR:", error);

    return res.status(500).json({
      ok: false,
      message: "Error alerts",
      error: error.message
    });
  }
});

module.exports = router;