const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ','') || req.query.token;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

module.exports = authMiddleware;
