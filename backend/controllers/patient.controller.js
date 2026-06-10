const service = require("../services/patient.service");

// ==========================
// CREAR PACIENTE
// ==========================
const createPatient = async (req, res) => {
  try {
    const { nombre, dni, edad, sexo, hospital_id: bodyHospital } = req.body;

    const { id, rol } = req.user;

    // =========================
    // VALIDACIONES (CLAVE)
    // =========================
    if (!nombre || !dni || !edad || !sexo) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios"
      });
    }

    if (edad <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Edad inválida"
      });
    }

    // =========================
    // HOSPITAL CONTROLADO
    // =========================
    let hospital_id;

    if (rol === "admin") {
      if (!bodyHospital) {
        return res.status(400).json({
          ok: false,
          message: "Admin debe especificar hospital_id"
        });
      }
      hospital_id = bodyHospital;
    } else {
      hospital_id = req.hospital_id; // 🔥 seguro
    }

    const doctor_id = id;

    // =========================
    // CREAR
    // =========================
    const patient = await service.createPatient({
      nombre,
      dni,
      edad,
      sexo,
      hospital_id,
      doctor_id
    });

    return res.json({
      ok: true,
      message: "Paciente creado correctamente",
      data: patient
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

// ==========================
// LISTAR PACIENTES
// ==========================
const getPatients = async (req, res) => {
  try {
    const { rol } = req.user;

    let data;

    if (rol === "admin") {
      data = await service.getAllPatients();
    } else {
      data = await service.getPatientsByHospital(req.hospital_id);
    }

    return res.json({
      ok: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

// ==========================
// OBTENER POR ID (OBLIGATORIO)
// ==========================
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.user;

    let patient;

    if (rol === "admin") {
      patient = await service.getPatientById(id);
    } else {
      patient = await service.getPatientByIdAndHospital(id, req.hospital_id);
    }

    if (!patient) {
      return res.status(404).json({
        ok: false,
        message: "Paciente no encontrado"
      });
    }

    return res.json({
      ok: true,
      data: patient
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById
};