const API_URL = "http://localhost:3000/api";

// Obtener token
function getToken() {
  return localStorage.getItem("token");
}

// Request genérico
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

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error en la API");
    }

    return await res.json();

  } catch (err) {
    console.error("API ERROR:", err.message);
    throw err;
  }
}

// Métodos
export const api = {
  get: (url) => request(url),
  post: (url, data) => request(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
};