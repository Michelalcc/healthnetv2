const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email y password requeridos"
      });
    }

    const result = await authService.login(email, password);

    return res.json({
      ok: true,
      ...result
    });

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = { login };