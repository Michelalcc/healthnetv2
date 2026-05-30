
// ======================
// SIDEBAR TOGGLE PRO
// ======================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  document.body.classList.toggle("sidebar-hidden");
  sidebar.classList.toggle("hidden");

  // sincronizar UI completa
  syncLayout();
}

// ======================
// SINCRONIZAR LAYOUT
// ======================
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

// ======================
// LOGOUT REAL
// ======================

function logout() {
  console.log("Logging out...");

  // 🧹 limpiar TODO
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // reset visual state
  document.body.classList.remove("sidebar-hidden");

  // redirección limpia
  window.location.href = "/pages/index.html";
}

// export global
window.logout = logout;

// ======================
// INIT LAYOUT (IMPORTANTE)
// ======================
function initLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "/pages/index.html";
    return;
  }

  syncLayout();
}

// export global
window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.initLayout = initLayout;