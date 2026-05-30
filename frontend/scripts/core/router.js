function redirectByRole(role) {

  if (!role) {
    window.location.href = "/pages/index.html";
    return;
  }

  role = role.toLowerCase().trim();

  // 🔥 TODOS VAN A DASHBOARD (MEJOR UX)
  window.location.href = "/pages/dashboard.html";
}

// ======================
// GUARDIA GLOBAL FINAL
// ======================
function routeGuard() {

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const path = window.location.pathname;

  // 🔴 bloquear SOLO si no hay sesión y no está en login
  if ((!token || !userRaw) && !path.includes("index.html")) {
    window.location.href = "/pages/index.html";
    return;
  }

  let user;

  try {
    user = JSON.parse(userRaw || "{}");
  } catch (error) {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }

  // 🧠 si está logueado y entra al login → mandarlo al dashboard
  if (path.includes("index.html") && token && user?.rol) {
    window.location.href = "/pages/dashboard.html";
    return;
  }

  // 🔴 protección especialista
  if (path.includes("diagnostico.html") && user.rol !== "especialista") {
    window.location.href = "/pages/dashboard.html";
    return;
  }

  // 🔴 protección admin
  if (
    (path.includes("users.html") || path.includes("hospitales.html")) &&
    user.rol !== "admin"
  ) {
    window.location.href = "/pages/dashboard.html";
    return;
  }
}

window.redirectByRole = redirectByRole;
window.routeGuard = routeGuard;