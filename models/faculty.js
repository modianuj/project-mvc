const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const faculty = mongoose.model('faculty', facultySchema);
module.exports = faculty;
