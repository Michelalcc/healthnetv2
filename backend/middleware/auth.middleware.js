const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado: falta Authorization"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        ok: false,
        message: "Formato inválido (Bearer TOKEN)"
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id || !decoded.rol) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido"
      });
    }

    req.user = decoded;

    next();

  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado"
    });
  }
};

module.exports = authMiddleware;