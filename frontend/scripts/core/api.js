const API_URL = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

function logoutAndRedirect() {
  localStorage.clear();
  window.location.href = "/pages/index.html";
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, config);

    if (res.status === 401) {
      logoutAndRedirect(); // 🔥 clave
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error en API");
    }

    return data;

  } catch (err) {
    console.error("API ERROR:", err.message);
    throw err;
  }
}

export const api = {
  get: (url) => request(url),
  post: (url, data) =>
    request(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
};