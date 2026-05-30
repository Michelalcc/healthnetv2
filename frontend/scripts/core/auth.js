async function login(email, password) {
  try {

    localStorage.clear();

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      return { ok: false, message: "Error servidor" };
    }

    const data = await res.json();

    if (!data || !data.ok || !data.token || !data.user) {
      return { ok: false, message: "Credenciales inválidas" };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("TOKEN:", data.token);

    return {
      ok: true,
      user: data.user
    };

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { ok: false, message: "Error conexión" };
  }
}

window.login = login;