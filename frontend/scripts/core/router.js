function redirectByRole(role) {

  if (!role) return;

  if (role === "admin") {
    window.location.href = "/pages/dashboard.html";
  }

  if (role === "doctor") {
    window.location.href = "/pages/dashboard.html";
  }

  if (role === "especialista") {
    window.location.href = "/pages/diagnostico.html";
  }
}