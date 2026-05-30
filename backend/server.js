require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// FRONTEND
// ======================
app.use(express.static(path.join(__dirname, "../frontend")));

// ======================
// TEST
// ======================
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "HealthNet v2 funcionando correctamente"
  });
});

// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const diagnosisRoutes = require("./routes/diagnosis.routes");
const patientRoutes = require("./routes/patient.routes");
const alertsRoutes = require("./routes/alerts.routes");

// API
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/alerts", alertsRoutes);

// ======================
// ERROR HANDLER GLOBAL
// ======================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR GLOBAL:", err);

  res.status(500).json({
    ok: false,
    message: "Error interno del servidor",
    error: err.message
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto " + PORT);
});