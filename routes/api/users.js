const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const mailer = require('nodemailer');
const multer = require('multer');
const auth = require('../../middleware/auth');

const upload = multer({
  storage: storage
});

// @route post api/users
// @desc Create User
// @access Public
router.post(
  '/',
  upload.single('image'),
  [
    check('name', 'Nom requis')
      .not()
      .isEmpty(),
    check('email', 'Veuillez saisir une adresse email valide.').isEmail(),
    check(
      'password',
      'Veuillez saisir un mot de passe avec au moins 6 caractères'
    ).isLength({ min: 6 }),
    check('password2', 'Mot de passe requis')
      .not()
      .isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, password2 } = req.body;

    try {
      let user = await User.findOne({ email });

      //Check if user already exist
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email déja associé à un utilisateur' }] });
      }

      // Check password match
      if (password !== password2) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Mot de passe différent' }] });
      }
      const avatar = 'avatar.jpeg';

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
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

//@route POST api/user/forgotpassword
//@description request password lost
//@acces  public

router.post('/forgotpassword', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  try {
    console.log(user);
    // Send email verification
    const output = `
     <h3>Bonjour ${user.name}</h3>
     <p>Merci de bien vouloir cliquer sur le lien ci-dessous pour reinitialiser votre mot de passe:</p>
     <p>Cliquez <a href="http://localhost:5000/api/users/newpassword/${user.id}">ici</a>.</p>`;

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
      subject: 'Demande de nouveau mot de passe', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
    });
    res.json({
      msg:
        'Votre demande de changement de mot de passe à bien été prise en compte, un email de réinitialisation va vous être envoyé.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Serveur erreur');
  }
});

//@route PUT api/user/newpassword/:id
//@description change password
//@acces  private

router.put('/newpassword/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  try {
    let { newPassword, newPassword2 } = req.body;
    // Check password match
    if (newPassword !== newPassword2) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Mot de passe différent' }] });
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { password: newPassword },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

//@route POST api/user/avatar
//@description change avatar
//@acces  public

router.post('/avatar', upload.single('avatar'), auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    let img = req.file;

    if (img === undefined) {
      res.json({ msg: 'Veuillez importer une image' });
    }
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { avatar: img.filename },
      { new: true }
    );
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Serveur Error');
  }
});

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

//@route PUT api/users/friendlist
//@description add user to friendlist
//@acces  private

router.put('/friendlist/:id', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    //Check if already friend
    if (
      user.friendlist.filter(friend => friend.user == req.params.id).length > 0
    ) {
      return res.status(400).json({ msg: 'already friend' });
    }
    console.log(user.friendlist.filter(friend => friend.user));
    user.friendlist.unshift({ user: req.params.id });

    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

//@route PUT api/users/friendlist/friend_:id
//@description add delete user from friendlist
//@acces  private

router.put('/deletefriend/:id', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    // Check if the post is already liked
    if (
      user.friendlist.filter(like => like.user == req.params.id).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Vous n'etes pas ami avec cette personne." });
    }

    const removeIndex = user.friendlist.map(friend =>
      friend.user.toString().indexOf(req.params.id.toString())
    );

    user.friendlist.splice(removeIndex, 1);

    await user.save();

    res.json(user.friendlist);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
