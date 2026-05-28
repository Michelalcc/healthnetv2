function renderHeader() {
  const user = getUser();

  if (!user) return;

  const header = document.getElementById("header-user");

  const img = getProfileImage(user);

  header.innerHTML = `
    <div class="user-box">
      <img src="${img}" class="avatar">
      <div>
        <h4>${user.nombre}</h4>
        <small>${user.rol}</small>
      </div>
      <button onclick="logout()" class="logout-btn">Salir</button>
    </div>
  `;
}

function getProfileImage(user) {

  if (user.rol === "admin") {
    return "../assets/images/users/admin.png";
  }

  if (user.rol === "doctor") {
    return "../assets/images/users/doctor1.png";
  }

  if (user.rol === "especialista") {
    return "../assets/images/users/doctor2.png";
  }

  return "../assets/images/users/default.png";
}