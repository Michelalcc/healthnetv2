function initDashboard() {

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) {
    window.location.href = "/pages/index.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }

  loadUser(user);
  loadDashboard(token);
  loadAlerts(token);
}

// ======================
function loadUser(user) {

  document.getElementById("userName").innerText = user.nombre;
  document.getElementById("userRole").innerText = user.rol;

  const avatar = document.querySelector(".sidebar-avatar");

  const avatars = {
    admin: "admin.png",
    doctor: "doctor1.png",
    especialista: "doctor2.png"
  };

  if (avatar) {
    avatar.src = `../assets/images/users/${avatars[user.rol] || "doctor1.png"}`;
  }
}

// ======================
async function loadDashboard(token) {

  const res = await fetch("http://localhost:3000/api/dashboard", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!res.ok) return;

  const data = await res.json();

  if (!data.ok) return;

  document.getElementById("kpiPatients").innerText = data.data.pacientes;
  document.getElementById("kpiDiagnoses").innerText = data.data.diagnosticos;
  document.getElementById("kpiCritical").innerText = data.data.criticos;
}

// ======================
async function loadAlerts(token) {

  const res = await fetch("http://localhost:3000/api/alerts", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const box = document.getElementById("alertsBox");
  if (!box) return;

  if (!res.ok) {
    box.innerHTML = "Sin alertas";
    return;
  }

  const data = await res.json();

  box.innerHTML = data.data.map(a =>
    `<div class="activity-item">${a.message}</div>`
  ).join("");
}

window.initDashboard = initDashboard;