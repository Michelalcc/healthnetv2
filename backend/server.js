const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express(); // ✅ PRIMERO SIEMPRE

// ======================
// MIDDLEWARE BASE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// SERVIR FRONTEND
// ======================
app.use(express.static(path.join(__dirname, "../frontend")));

// ======================
// TEST ROOT
// ======================
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "HealthNet v2 backend funcionando correctamente"
  });
});

// ======================
// RUTAS
// ======================
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const diagnosisRoutes = require("./routes/diagnosis.routes");

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/diagnosis", diagnosisRoutes);

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto " + PORT);
});