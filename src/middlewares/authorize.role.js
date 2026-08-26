import jwt from 'jsonwebtoken';
// process.loadEnvFile();

export function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    // req.user ya existe gracias a authenticateToken
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    }

    next(); // El usuario tiene el rol correcto, continúa a la ruta
  };
}