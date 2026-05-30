const roleMiddleware = (roles) => {
  return (req, res, next) => {

    const userRole = req.user.rol;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        ok: false,
        message: "No autorizado por rol"
      });
    }

    next();
  };
};

module.exports = roleMiddleware;