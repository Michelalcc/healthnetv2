function initProtection(rolesPermitidos) {
  const user = getUser();

  if (!user) {
    window.location.href = "/pages/index.html";
    return;
  }

  if (!rolesPermitidos.includes(user.rol)) {
    alert("No tienes acceso a esta página");
    window.location.href = "/pages/index.html";
  }
}