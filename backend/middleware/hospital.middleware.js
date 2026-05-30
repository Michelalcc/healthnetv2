module.exports = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado"
      });
    }

    const { rol, hospital_id } = user;

    // =========================
    // ADMIN: acceso total
    // =========================
    if (rol === "admin") {
      return next();
    }

    // =========================
    // DOCTOR / ESPECIALISTA
    // =========================
    if (rol === "doctor" || rol === "especialista") {
      
      if (!hospital_id) {
        return res.status(403).json({
          ok: false,
          message: "Usuario sin hospital asignado"
        });
      }

      return next();
    }

    // =========================
    // ROL DESCONOCIDO
    // =========================
    return res.status(403).json({
      ok: false,
      message: "Rol no autorizado en sistema clínico"
    });

  } catch (error) {
    console.error("Hospital middleware error:", error);

    return res.status(500).json({
      ok: false,
      message: "Error en validación hospitalaria"
    });
  }
};