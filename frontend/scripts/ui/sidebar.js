function renderSidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img src="../assets/images/logos/logo.png">
      <h3>HealthNet</h3>
    </div>

    <div class="sidebar-user">
      <img class="sidebar-avatar" src="../assets/images/users/${user.rol}.png">
      <div>
        <div>${user.nombre}</div>
        <small>${user.rol}</small>
      </div>
    </div>

    <div class="sidebar-links">
      <a href="dashboard.html">📊 Dashboard</a>
      <a href="pacientes.html">👥 Pacientes</a>
      <a href="diagnostico.html">🧠 Diagnóstico</a>
      <a href="historial.html">📋 Historial</a>
    </div>

    <div class="sidebar-footer">
      <button class="logout-btn" onclick="logout()">🚪 Cerrar sesión</button>
    </div>
  `;
}

window.renderSidebar = renderSidebar;