const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get Token from header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'Merci de vous connecter pour accéder à ce contenu'
    });
  }

  // Verif token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    let user = await User.findOne({ _id: req.user.id });
    if (!user.isVerified) {
      return res.status(401).json({
        msg: 'Merci de verifier votre compte pour pouvoir accéder à ce contenu.'
      });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalide' });
  }
};
