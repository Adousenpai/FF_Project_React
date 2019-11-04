const mongoose = require('mongoose');

const FriendlistSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = Friendlist = mongoose.model('friendlist', FriendlistSchema);
