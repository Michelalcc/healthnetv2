
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no existe"
      });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        message: "Password incorrecta"
      });
    }

    // 🧠 NORMALIZAR ROL (CLAVE PARA TU ERROR)
    const role = (user.rol || "").toLowerCase().trim();

    const token = jwt.sign(
      {
        id: user.id,
        rol: role,
        hospital_id: user.hospital_id || null
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: role,
        hospital_id: user.hospital_id || null
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Error servidor"
    });
  }
};

module.exports = { login };