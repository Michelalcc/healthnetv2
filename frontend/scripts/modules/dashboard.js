
let dashboardInterval = null;
let alertsInterval = null;

// ======================
// INIT DASHBOARD
// ======================
function initDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔴 VALIDACIÓN REAL DE SESIÓN
  if (!user || !token) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/pages/index.html";
    return;
  }

  loadUser(user);
  loadDashboard(token);
  loadAlerts(token);

  // 🧹 evitar duplicados
  if (dashboardInterval) clearInterval(dashboardInterval);
  if (alertsInterval) clearInterval(alertsInterval);

  dashboardInterval = setInterval(() => loadDashboard(token), 5000);
  alertsInterval = setInterval(() => loadAlerts(token), 7000);
}

// ======================
// USER INFO
// ======================
function loadUser(user) {

  if (!user) return;

  document.getElementById("userName").innerText = user.nombre || "Usuario";
  document.getElementById("userRole").innerText = user.rol || "";

  const avatar = document.querySelector(".sidebar-avatar");

  if (avatar) {
    if (user.rol === "admin") {
      avatar.src = "../assets/images/users/admin.png";
    } else if (user.rol === "doctor") {
      avatar.src = "../assets/images/users/doctor1.png";
    } else if (user.rol === "especialista") {
      avatar.src = "../assets/images/users/doctor2.png";
    }
  }
}

// ======================
// DASHBOARD DATA
// ======================
async function loadDashboard(token) {

  try {

    const res = await fetch("http://localhost:3000/api/dashboard", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!res.ok) {

      if (res.status === 401) {
        console.warn("Sesión expirada");
        localStorage.clear();
        window.location.href = "/pages/index.html";
        return;
      }

      console.warn("Dashboard error HTTP:", res.status);
      return;
    }

    const data = await res.json();

    if (!data.ok) return;

    const patientsEl = document.getElementById("kpiPatients");
    const diagEl = document.getElementById("kpiDiagnoses");
    const critEl = document.getElementById("kpiCritical");

    if (patientsEl) patientsEl.innerText = data.data?.pacientes || 0;
    if (diagEl) diagEl.innerText = data.data?.diagnosticos || 0;
    if (critEl) critEl.innerText = data.data?.criticos || 0;

  } catch (err) {
    console.error("dashboard error:", err);
  }
}

// ======================
// ALERTAS MÉDICAS
// ======================
async function loadAlerts(token) {

  try {

    const res = await fetch("http://localhost:3000/api/alerts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!res.ok) {

      console.warn("Alerts HTTP error:", res.status);

      const box = document.getElementById("alertsBox");
      if (box) box.innerHTML = `<div class="activity-item">Sin alertas</div>`;
      return;
    }

    const data = await res.json();

    const box = document.getElementById("alertsBox");

    if (!box) return;

    if (!data.ok || !Array.isArray(data.data)) {
      box.innerHTML = `<div class="activity-item">Sin alertas</div>`;
      return;
    }

    if (data.data.length === 0) {
      box.innerHTML = `<div class="activity-item">Sin alertas activas</div>`;
      return;
    }

    box.innerHTML = data.data.map(a => `
      <div class="activity-item ${a.level || 'low'}">
        ${a.message || "Alerta"}
      </div>
    `).join("");

  } catch (err) {
    console.error("alerts error:", err);
  }
}

window.initDashboard = initDashboard;