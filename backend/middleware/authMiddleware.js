const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/jwt');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;