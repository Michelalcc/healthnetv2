function renderSidebar() {
  const sidebar = document.getElementById("sidebar");

  const user = getUser();

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h3>HealthNet</h3>
    </div>

    <a href="dashboard.html">📊 Dashboard</a>
    <a href="pacientes.html">🧑‍⚕️ Pacientes</a>
    <a href="diagnostico.html">🧠 Diagnóstico</a>
    <a href="historial.html">📋 Historial</a>

    <button onclick="logout()">Cerrar sesión</button>
  `;
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}