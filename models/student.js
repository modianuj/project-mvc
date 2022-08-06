const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const student = mongoose.model('student', studentSchema);

module.exports = student;
