const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  guilde: {
    type: String
  },
  serveur: {
    type: String,
    required: true
  },
  jobs: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  discordusername: {
    type: String
  },
  activity: {
    main1: {
      type: String
    },
    main2: {
      type: String
    },
    description: {
      type: String
    }
  },
  experience: [
    {
      extension: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      company: {
        type: String
      }
    }
  ],

  photos: [
    {
      photo: {
        type: String
      },
      title: {
        type: String
      },
      text: {
        type: String
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
