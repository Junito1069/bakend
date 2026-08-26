import jwt from 'jsonwebtoken';
// process.loadEnvFile();

export function authenticateToken(req, res, next) {
  // El estándar es enviar el token en la cabecera: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  // Verifica el token con tu secreto
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }

    // Si es válido, guardamos los datos decodificados (incluyendo el rol) en req.user
    req.user = user;
    next(); // Pasa el control al siguiente middleware o a la ruta final
  });
}