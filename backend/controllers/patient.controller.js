const service = require("../services/patient.service");

// ==========================
// CREAR PACIENTE (FASE 2 PRO)
// ==========================
const createPatient = async (req, res) => {
  try {
    const { nombre, dni, edad, sexo, hospital_id: bodyHospital } = req.body;

    const { id, rol, hospital_id: userHospital } = req.user;

    // =========================
    // REGLA: DOCTOR O ESPECIALISTA
    // =========================
    let hospital_id = userHospital;
    const doctor_id = id;

    // =========================
    // ADMIN CONTROL TOTAL
    // =========================
    if (rol === "admin") {
      hospital_id = bodyHospital || null;
    }

    // =========================
    // BLOQUEO DE SEGURIDAD
    // =========================
    if (!hospital_id && rol !== "admin") {
      return res.status(400).json({
        ok: false,
        message: "Hospital no asignado al usuario"
      });
    }

    // =========================
    // CREAR PACIENTE
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
    console.error("CREATE PATIENT ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

// ==========================
// LISTAR PACIENTES (FASE 2 PRO)
// ==========================
const getPatients = async (req, res) => {
  try {
    const { rol, hospital_id } = req.user;

    let data;

    // =========================
    // ADMIN VE TODO EL SISTEMA
    // =========================
    if (rol === "admin") {
      data = await service.getAllPatients();
    }

    // =========================
    // OTROS ROLES FILTRADOS POR HOSPITAL
    // =========================
    else {
      if (!hospital_id) {
        return res.status(403).json({
          ok: false,
          message: "Usuario sin hospital asignado"
        });
      }

      data = await service.getPatientsByHospital(hospital_id);
    }

    return res.json({
      ok: true,
      data
    });

  } catch (error) {
    console.error("GET PATIENTS ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

module.exports = {
  createPatient,
  getPatients
};