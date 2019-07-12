//Required Dependencies
const mongoose = require('mongoose');

//Create Profile Schema
const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  experience: [
    {
      event_type: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      cuisine_type: {
        type: String
      },
      description: {
        type: String
      },
      guest_amount: {
        type: Number
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
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    pinterest: {
      type: String
    }
  }
});
