const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const multer = require('multer');

// @route POST api/post
// @desc create a Post
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Ce champ est requis')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }
);

// @route GET api/post
// @desc Get all posts
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// @route GET api/post/:id
// @desc Get post by ID
// @access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Publication introuvable' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Publication introuvable' });
    }
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// @route DELETE api/post/:id
// @desc delete post by ID
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Vous ne possédez pas les autorisations nécessaire pour cet action'
      });
    }

    await post.remove();
    res.json({ msg: 'Publication supprimé' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Publication introuvable' });
    }
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// @route PUT api/post/like/:id
// @desc  Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post is already liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Vous aimez déja cette publication' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post is already liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Cette publication n'est pas liké " });
    }

    const removeIndex = post.likes.map(like =>
      like.user.toString().indexOf(req.user.id)
    );

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// @route POST api/post/comment/:id
// @desc Commante a post
// @access Private

router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Ce champ est requis')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  }
);

// @route POST api/post/comment/:id/:comment_id
// @desc delete comment
// @access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Recuperer le commentaire
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Verifier si le commentaire existe
    if (!comment) {
      return res.status(404).json({ msg: 'Commentaire introuvable' });
    }

    // Vérifier si l'user est bien le créateur du commentaire
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission refusé' });
    }

    const removeComment = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeComment, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
