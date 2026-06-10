const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.rol) {
        return res.status(401).json({
          ok: false,
          message: "Usuario no autenticado"
        });
      }

      const userRole = (req.user.rol || "").toLowerCase().trim();

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          ok: false,
          message: "No autorizado por rol"
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error en validación de roles"
      });
    }
  };
};

module.exports = roleMiddleware;