const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const login = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const user = result.rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      rol: user.rol,
      hospital_id: user.hospital_id
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "8h" }
  );

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      hospital_id: user.hospital_id
    },
    token
  };
};

module.exports = { login };