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
      return res.json({ ok: false, message: "Usuario no existe" });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({ ok: false, message: "Password incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        hospital_id: user.hospital_id
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error servidor" });
  }
};

module.exports = { login };