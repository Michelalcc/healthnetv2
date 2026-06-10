// ======================
// SESSION CORE ENTERPRISE
// ======================

// 🔐 TOKEN
function getToken() {
  return localStorage.getItem("token");
}

// 👤 USER
function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.warn("User JSON corrupto");
    localStorage.removeItem("user");
    return null;
  }
}

// 🏥 HOSPITAL ID (opcional futuro)
function getHospitalId() {
  const user = getUser();
  return user?.hospital_id || null;
}

// 🔒 CHECK SESSION
function isAuthenticated() {
  return !!getToken() && !!getUser();
}

// 🚪 LOGOUT GLOBAL
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // reset visual state global
  document.body.classList.remove("sidebar-hidden");

  window.location.href = "/pages/index.html";
}

// 🧠 VALIDACIÓN SEGURA (para páginas protegidas)
function requireAuth() {
  if (!isAuthenticated()) {
    logout();
  }
}

// ======================
// EXPORT GLOBAL
// ======================
window.getToken = getToken;
window.getUser = getUser;
window.getHospitalId = getHospitalId;
window.isAuthenticated = isAuthenticated;
window.logout = logout;
window.requireAuth = requireAuth;