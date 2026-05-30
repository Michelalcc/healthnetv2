function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// EXPORT GLOBAL
window.getToken = getToken;
window.getUser = getUser;
window.logout = logout;