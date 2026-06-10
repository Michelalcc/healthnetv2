// ==============================
// LAYOUT ENTERPRISE CORE
// ==============================

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  document.body.classList.toggle("sidebar-hidden");
  sidebar.classList.toggle("hidden");

  syncLayout();
}

// ==============================
// SYNC LAYOUT RESPONSIVE
// ==============================
function syncLayout() {
  const isHidden = document.body.classList.contains("sidebar-hidden");

  const content = document.querySelector(".content");
  const topbar = document.querySelector(".topbar");

  if (content) {
    content.style.marginLeft = isHidden ? "0" : "270px";
  }

  if (topbar) {
    topbar.style.marginLeft = isHidden ? "0" : "270px";
  }
}

// ==============================
// 🎨 HOSPITAL THEME ENGINE
// ==============================
function applyHospitalTheme(hospitalId) {
  const root = document.documentElement;

  const themes = {
    1: {
      primary: "#22c55e", // verde suave
    },
    2: {
      primary: "#3b82f6", // azul clínico
    },
    3: {
      primary: "#facc15" // amarillo controlado
    }
  };

  const theme = themes[hospitalId] || themes[2];

  root.style.setProperty("--primary-color", theme.primary);
}

// ==============================
// 👤 TOPBAR USER RENDER
// ==============================
function loadTopbarUser() {
  const userRaw = localStorage.getItem("user");

  if (!userRaw) return;

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    console.warn("Usuario inválido");
    return;
  }

  const nameEl = document.getElementById("topUserName");
  const roleEl = document.getElementById("topUserRole");
  const avatarEl = document.getElementById("topAvatar");

  if (nameEl) nameEl.innerText = user.nombre || "Usuario";
  if (roleEl) roleEl.innerText = (user.rol || "").toUpperCase();

  if (avatarEl) {
    const avatars = {
      admin: "../assets/images/users/admin.png",
      doctor: "../assets/images/users/doctor1.png",
      especialista: "../assets/images/users/doctor2.png"
    };

    avatarEl.src = avatars[user.rol] || "../assets/images/users/default.png";
  }

  // 🏥 aplicar hospital theme
  applyHospitalTheme(user.hospital_id);
}

// ==============================
// 🚪 LOGOUT ENTERPRISE
// ==============================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.body.classList.remove("sidebar-hidden");

  window.location.href = "/pages/index.html";
}

// ==============================
// INIT LAYOUT ENTERPRISE
// ==============================
function initLayout() {
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

  if (!user?.rol) {
    window.location.href = "/pages/index.html";
    return;
  }

  // 🔥 aplicar hospital SIEMPRE
  applyHospitalTheme(user.hospital_id);

  syncLayout();
  loadTopbarUser();
}

// ==============================
// GLOBAL EXPORTS
// ==============================
window.toggleSidebar = toggleSidebar;
window.syncLayout = syncLayout;
window.loadTopbarUser = loadTopbarUser;
window.initLayout = initLayout;
window.logout = logout;
window.applyHospitalTheme = applyHospitalTheme;