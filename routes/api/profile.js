const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@description get current user profil
//@acces  private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Aucun profil trouvé pour cet utilisateur' });
    }

    res.json(profile);
    console.log(profile);
  } catch (error) {
    console
      .error(error.message)
      .status(500)
      .send('Erreur serveur');
  }
});

//@route POST api/profile
//@description create or update user profil
//@acces  private

router.post(
  '/',
  [
    auth,
    check('serveur', 'Un serveur est requis')
      .not()
      .isEmpty(),
    check('jobs', 'Une classe est requise')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      guilde,
      serveur,
      jobs,
      bio,
      discordusername,
      youtube,
      twitter,
      facebook,
      instagram
    } = req.body;

    // Build profil object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (guilde) profileFields.guilde = guilde;
    if (serveur) profileFields.serveur = serveur;
    if (bio) profileFields.bio = bio;
    if (discordusername) profileFields.discordusername = discordusername;
    if (jobs) {
      profileFields.jobs = jobs.split(',').map(job => job.trim());
    }

    // Build Social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json({ profile });
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json({ profile });
    } catch (error) {
      console
        .error(error)
        .status(400)
        .send('Erreur serveur');
    }
  }
);

//@route GET api/profile
//@description get all profil
//@acces  public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console
      .error(error)
      .status(500)
      .send('Error serveur');
  }
});

//@route GET api/profile/user/:user_id
//@description get profil by  user id
//@acces  public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).json({ msg: 'Profil introuvable' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profil introuvable' });
    }
    res.status(500).send('Error serveur');
  }
});

//@route DELETE api/profile
//@description delete profile, user & posts
//@acces  private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'Utilisateur supprimé' });

    res.json(profiles);
  } catch (error) {
    console
      .error(error)
      .status(500)
      .send('Error serveur');
  }
});

//@route PUT api/profile/experience
//@description add profile experience
//@acces  private

router.put(
  '/experience',
  [
    auth,
    [
      check('extension', 'ce champ est requis')
        .not()
        .isEmpty(),
      check('title', 'Ce champ est requis')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { extension, title, company } = req.body;

    const newExp = {
      extension,
      title,
      company
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//@description delete profile experience
//@acces  private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
