const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route Get api/auth
// @acces Private
router.get('/', auth, async (req, res) => {
  try {
    // Get auth user
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// @description Authenticate User & Get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Identifiant ou mot de passe invalide').isEmail(),
    check('password', 'Identifiant ou mot de passe invalide').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // See if user exist
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Identifiant ou mot de passe invalide' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Identifiant ou mot de passe invalide!' }] });
      }

      // get payload
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    }
  }
);

module.exports = router;
