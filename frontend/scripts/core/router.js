// ======================
// ROUTER ENTERPRISE FINAL
// ======================

// 🎯 MAPA DE RUTAS POR ROL
function getRouteByRole(role) {
  const routes = {
    admin: "/pages/dashboard.html",
    doctor: "/pages/dashboard.html",
    especialista: "/pages/diagnostico.html"
  };

  return routes[role] || "/pages/dashboard.html";
}

// ======================
// REDIRECCIÓN POR ROL
// ======================
function redirectByRole(role) {
  if (!role) {
    window.location.href = "/pages/index.html";
    return;
  }

  const cleanRole = role.toLowerCase().trim();
  window.location.href = getRouteByRole(cleanRole);
}

// ======================
// GUARDIA GLOBAL ENTERPRISE
// ======================
function routeGuard() {

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const path = window.location.pathname;

  const isLoginPage = path.includes("index.html");

  // ======================
  // 1. SIN SESIÓN
  // ======================
  if (!token || !userRaw) {

    // permitir acceso SOLO a login
    if (!isLoginPage) {
      window.location.href = "/pages/index.html";
    }

    return;
  }

  // ======================
  // 2. VALIDAR USER JSON
  // ======================
  let user;

  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    console.warn("Usuario corrupto");
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }

  const role = (user.rol || "").toLowerCase().trim();

  // ======================
  // 3. SI ESTÁ EN LOGIN → REDIRIGIR AL SISTEMA
  // ======================
  if (isLoginPage) {
    redirectByRole(role);
    return;
  }

  // ======================
  // 4. CONTROL DE ACCESO POR ROL
  // ======================

  const currentPage = path.split("/").pop();

  // especialista SOLO diagnóstico
  if (role === "especialista") {
    if (currentPage !== "diagnostico.html") {
      window.location.href = "/pages/diagnostico.html";
      return;
    }
  }

  // doctor y admin no deben entrar a páginas restringidas de especialista
  if ((role === "doctor" || role === "admin")) {

    if (currentPage === "diagnostico.html" && role !== "especialista") {
      window.location.href = "/pages/dashboard.html";
      return;
    }
  }

  // ======================
  // 5. SEGURIDAD EXTRA
  // ======================

  if (!["admin", "doctor", "especialista"].includes(role)) {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }
}

// ======================
// LOGOUT GLOBAL
// ======================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/pages/index.html";
}

// ======================
// EXPORT GLOBAL
// ======================
window.redirectByRole = redirectByRole;
window.routeGuard = routeGuard;
window.logout = logout;