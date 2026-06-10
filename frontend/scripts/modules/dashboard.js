import { api } from "../core/api.js";

async function initDashboard() {
  try {
    const data = await api.get("/dashboard");

    document.getElementById("totalPacientes").innerText =
      data.data.pacientes;

    document.getElementById("totalDiagnosticos").innerText =
      data.data.diagnosticos;

    document.getElementById("totalCriticos").innerText =
      data.data.criticos;

  } catch (error) {
    console.error("Error dashboard:", error.message);
  }
}

window.initDashboard = initDashboard;