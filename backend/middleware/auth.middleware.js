const jwt = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        ok: false,
        message: "Formato inválido"
      });
    }

    const token = parts[1];

    const decoded = jwt.verifyToken(token);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado"
    });
  }
};

module.exports = authMiddleware;