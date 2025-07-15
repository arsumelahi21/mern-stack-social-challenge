const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'mySecret123'; 

module.exports = function authorize(roles = []) {
  return (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(403).json({ error: 'Forbidden' });

    const token = auth.split(' ')[1];
    try {
      const payload = jwt.verify(token, SECRET);
      if (!roles.includes(payload.role)) return res.status(403).json({ error: 'Forbidden' });
      req.user = payload;
      next();
    } catch {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};
