const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    // if (decoded.data.role === 'admin') {
    //   req.userId = decoded.data.role;
    //   next();
    //   return null;
    // }
    const user = await userModel.getByEmail(decoded.data.email);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.userId = decoded.data.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}; 