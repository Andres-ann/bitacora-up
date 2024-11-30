import jwt from 'jsonwebtoken';

export const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userIdFromToken = decoded.id;

    const userIdFromRequest = req.params.id;

    if (userIdFromToken !== userIdFromRequest) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Token does not match the user' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
