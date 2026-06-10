const service = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const { rol } = req.user;

    let data;

    // ======================
    // ADMIN
    // ======================
    if (rol === "admin") {
      data = await service.getAdminStats();
    } else {
      // 🔥 usar hospital seguro
      if (!req.hospital_id) {
        return res.status(400).json({
          ok: false,
          message: "Usuario sin hospital asignado"
        });
      }

      data = await service.getHospitalStats(req.hospital_id);
    }

    return res.json({
      ok: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error dashboard",
      error: error.message
    });
  }
};

module.exports = { getDashboard };