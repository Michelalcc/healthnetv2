const express = require("express");
const router = express.Router();

const controller = require("../controllers/diagnosis.controller");
const auth = require("../middleware/auth.middleware");
const hospital = require("../middleware/hospital.middleware");

router.post("/", auth, hospital, controller.create);
router.get("/paciente/:id", auth, hospital, controller.getByPatient);

module.exports = router;