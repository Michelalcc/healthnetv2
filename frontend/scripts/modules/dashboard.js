function initDashboard() {
  renderSidebar();
  loadUser();
  loadDashboard();
}

// ---------------- USER HEADER ----------------
function loadUser() {
  const user = getUser();

  if (!user) return;

  document.getElementById("userName").innerText = user.nombre;
  document.getElementById("userRole").innerText = user.rol;

  const avatar = document.getElementById("userAvatar");

  if (user.rol === "admin") {
    avatar.src = "../assets/images/users/admin.png";
  } else if (user.rol === "doctor") {
    avatar.src = "../assets/images/users/doctor1.png";
  } else {
    avatar.src = "../assets/images/users/doctor2.png";
  }
}

// ---------------- DASHBOARD DATA ----------------
async function loadDashboard() {
  try {
    const token = getToken();

    const res = await fetch("http://localhost:3000/api/dashboard", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    if (!data.ok) return;

    document.getElementById("totalPacientes").innerText = data.data.pacientes;
    document.getElementById("totalDoctores").innerText = data.data.doctores;
    document.getElementById("totalEspecialistas").innerText = data.data.especialistas;

  } catch (err) {
    console.error(err);
  }
}