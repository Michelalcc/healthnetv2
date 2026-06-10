module.exports = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado"
      });
    }

    const { rol, hospital_id } = req.user;

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

      // 🔥 CLAVE: FORZAR hospital_id
      req.hospital_id = hospital_id;

      return next();
    }

    // =========================
    // ROL DESCONOCIDO
    // =========================
    return res.status(403).json({
      ok: false,
      message: "Rol no autorizado"
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error en validación hospitalaria"
    });
  }
};