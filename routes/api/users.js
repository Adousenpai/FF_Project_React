const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const mailer = require('nodemailer');

// @route post api/users
// @desc Create User
// @access Public
router.post(
  '/',
  [
    check('name', 'Nom requis')
      .not()
      .isEmpty(),
    check('email', 'Veuillez saisir une adresse email valide.').isEmail(),
    check(
      'password',
      'Veuillez saisir un mot de passe avec au moins 6 caractères'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //Check if user already exist
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email déja associé à un utilisateur' }] });
      }

      // Get avatar user
      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm'
      // });

      // Get User body
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user in database
      await user.save();
      res.json({
        message:
          'Votre compte à bien été créé, un mail de vérification vous à été envoyé'
      });

      // Send email verification
      const output = `
      <h3>Bonjour ${user.name}</h3>
      <p>Merci de bien vouloir cliquer sur le lien ci-dessous pour valider votre compte:</p>
      <p>Cliquez <a href="http://localhost:5000/api/users/${user.id}">ici</a>.</p>`;

      // Nodemailer configuration
      let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });

      // Email destination and information
      let info = await transporter.sendMail({
        from: '"MoogleBook" <simplonportfolio@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: 'Verification du compte', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route get api/users/:id
// @desc Valid User
// @access Public

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isVerified = true;
    user.save();
    // res.send(`Merci ${user.name} votre compte à bien été vérifié.`);

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
        res.json({
          msg: `Merci ${user.name} votre compte à bien été vérifié`,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
