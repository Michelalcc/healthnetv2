const service = require("../services/diagnosis.service");

const create = async (req, res) => {
  try {
    const doctor_id = req.user?.id || null;

    const data = await service.createDiagnosis({
      paciente_id: req.body.paciente_id,
      resultado: req.body.resultado,
      probabilidad: req.body.probabilidad,
      tiene_fibroma: req.body.tiene_fibroma,
      recomendacion: req.body.recomendacion,
      doctor_id
    });

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
  create
};