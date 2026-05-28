const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getStats();

    res.json({
      ok: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard
};