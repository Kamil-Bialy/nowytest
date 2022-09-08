const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
  roleID: {
    // 0 - user, 1 - admin
    type: Number,
    required: true,
  },
  stories: [
    {
      text: String,
      title: String,
      image: String,
      added: Date,
      accepted: Boolean,
    },
  ],
  arrival:{
    type: Boolean,
  },
  dinner:{
    type: Boolean,
  }
});

module.exports = mongoose.model('users', userSchema);
