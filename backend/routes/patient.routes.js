const router = require("express").Router();

const controller = require("../controllers/patient.controller");
const auth = require("../middleware/auth.middleware");

// =========================
// PACIENTES ROUTES
// =========================

// CREAR PACIENTE
router.post("/", auth, controller.createPatient);

// LISTAR PACIENTES
router.get("/:id", auth, controller.getPatientById);

module.exports = router;