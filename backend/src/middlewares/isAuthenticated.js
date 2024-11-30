import jwt from 'jsonwebtoken';

/**
 * Middleware para validar autenticación.
 */
export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Formato "Bearer <token>"
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: Invalid token format' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Adjuntar el ID del usuario autenticado al objeto `req`
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
