const faculty = require('../models/faculty');
const student = require('../models/student');

module.exports = {
  registerData: async (req, res) => {
    var facultyRecord = await faculty.findOne({ email: req.body.email });
    if (!facultyRecord) {
      var record = await faculty.create(req.body);
      if (!record) {
        console.log(`error to creatte faculty data`);
        return res.json({ 'msg': 'error to create faculty data' });
      } else {
        console.log(`faculty succesfully registered`);
        return res.json({ 'msg': 'faculty succesfully registered' });
      }
    } else {
      console.log(`faculty already exists`);
      return res.json({ 'msg': 'faculty already exists' });
    }
  },
  viewFaculty: async (req, res) => {
    let facultyRecord = faculty.findOne({ email: req.body.email });
    if (!facultyRecord) {
      console.log(`email not exists`);
      return res.json({ 'msg': 'email incorrect' });
    }
    if (!facultyRecord || facultyRecord.password != req.body.password) {
      console.log(`password incorrect`);
      return res.json({ 'msg': 'password incorrect' });
    }

    if (
      facultyRecord.email == req.body.email ||
      facultyRecord.password == req.body.password
    ) {
      let finalRecord = await faculty.find({});
      if (!finalRecord) {
        console.log(`error to find data`);
        return res.json({ 'msg': 'error to find data' });
      }
      return res.json({ 'faculty Data': finalRecord });
    }
  },
  viewStudent: async (req, res) => {
    let facultyRecord = faculty.findOne({ email: req.body.email });
    if (facultyRecord) {
      if (facultyRecord.password == req.body.password) {
        let finalRecord = await student.find({});
        if (!finalRecord) {
          console.log(`error to find data`);
          return res.json({ 'msg': 'error to find data' });
        } else {
          return res.json({ 'faculty Data': finalRecord });
        }
      } else {
        console.log(`password incorrect`);
        return res.json({ 'msg': 'password incorrect' });
      }
    } else {
      console.log(`email not exists`);
      return res.json({ 'msg': 'login credentioal incorrect' });
    }
  },
  findRecord: (req, res) => {
    faculty.aggregate(
      [
        {
          $match: { email: req.body.email },
        },
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: 'facultyId',
            as: 'fdata',
          },
        },
        {
          $project: {
            '_id': '$fdata.name',
            'total': { $sum: '$fdata.fees' },
          },
        },
      ],
      function (error, fdata) {
        if (error) {
          console.log(`aggrigate error`);
          return false;
        } else {
          return res.json({ 'msg': fdata });
        }
      }
    );
  },
};
