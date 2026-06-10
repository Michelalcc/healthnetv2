import { api } from "./api.js";

async function login(email, password) {
  try {
    localStorage.clear();

    const data = await api.post("/auth/login", {
      email,
      password
    });

    if (!data?.ok) {
      return {
        ok: false,
        message: data.message
      };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return {
      ok: true,
      user: data.user
    };

  } catch (error) {
    return {
      ok: false,
      message: error.message
    };
  }
}

window.login = login;