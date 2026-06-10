function protectRoute() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    window.location.href = "/pages/index.html";
    return;
  }

  try {
    JSON.parse(user);
  } catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
  }
}

window.protectRoute = protectRoute;