function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}