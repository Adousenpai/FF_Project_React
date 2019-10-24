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
  try {
    let user = await User.findOne({ user: req.user });

    if (user.isVerified === !true) {
      return res.status(401).json({
        msg:
          'Merci de bien vouloir activer votre compte via le mail de vérification'
      });
    }
  } catch (err) {
    console.error(err);
  }

  // Verif token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalide' });
  }
};
