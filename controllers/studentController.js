const student = require('../models/student');

module.exports = {
  registerStudent: async (req, res) => {
    var studentRecord = await student.findOne({ email: req.body.email });
    if (!studentRecord) {
      var record = student.create(req.body);
      if (!record) {
        console.log(`error to register student`);
      } else {
        console.log(`student successfully registered`);
        return res.json({ 'msg': 'student register succesfully' });
      }
    } else {
      console.log(`student already exists`);
      return res.json({ 'msg': 'student already exists' });
    }
  },
};
