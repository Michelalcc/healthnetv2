async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!data || !data.ok || !data.user) {
      return { ok: false };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    redirectByRole(data.user.rol);

    return { ok: true };

  } catch (error) {
    console.error("Error login:", error);
    return { ok: false };
  }
}