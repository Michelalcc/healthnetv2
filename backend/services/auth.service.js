const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwt = require("../utils/jwt");

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
    throw new Error("Credenciales inválidas");
  }

  const role = (user.rol || "").toLowerCase().trim();

  const token = jwt.generateToken({
    id: user.id,
    email: user.email,
    rol: role,
    hospital_id: user.hospital_id || null
  });

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: role,
      hospital_id: user.hospital_id || null
    },
    token
  };
};

module.exports = { login };