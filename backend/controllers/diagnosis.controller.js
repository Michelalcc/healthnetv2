const service = require("../services/diagnosis.service");
const patientService = require("../services/patient.service");

// ==========================
// CREAR DIAGNÓSTICO
// ==========================
const create = async (req, res) => {
  try {
    const { paciente_id } = req.body;
    const { id: doctor_id, rol } = req.user;

    // =========================
    // VALIDAR PACIENTE EXISTE
    // =========================
    const patient = await patientService.getPatientById(paciente_id);

    if (!patient) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado"
      });
    }

    // =========================
    // VALIDAR HOSPITAL
    // =========================
    if (rol !== "admin" && patient.hospital_id !== req.hospital_id) {
      return res.status(403).json({
        ok: false,
        message: "No puedes diagnosticar pacientes de otro hospital"
      });
    }

    // =========================
    // IA
    // =========================
    const ai = await service.runAI();

    // =========================
    // GUARDAR
    // =========================
    const data = await service.createDiagnosis({
      paciente_id,
      ...ai,
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

// ==========================
// HISTORIAL POR PACIENTE
// ==========================
const getByPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await service.getByPatient(id);

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
  create,
  getByPatient
};