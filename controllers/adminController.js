const register = require('../models/admin');
const jsonweb = require('jsonwebtoken');

module.exports = {
  registerData: async (req, res) => {
    if (req.body.password == req.body.confirm_password) {
      var adminRecord = await register.findOne({ username: req.body.username });
      if (!adminRecord) {
        var record = await register.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        if (!record) {
          console.log(`error to create record`);
          return res.json({ 'msg': error });
        } else {
          return res.json({ 'msg': 'register succesfully' });
        }
      } else {
        console.log(`record already exists`);
        return res.json({ 'msg': 'admin already exist' });
      }
    } else {
      console.log(`password and confirm password are not match`);
      return res.json({ 'msg': 'password and confirm password are not match' });
    }
  },
  loginData: async (req, res) => {
    var loginRecord = await register.findOne({ email: req.body.email });
    if (!loginRecord) {
      console.log(`login email not found`);
      return false;
    }
    if (!loginRecord || loginRecord.password != req.body.password) {
      console.log(`password is wrong`);
      return res.json({ 'msg': 'you entered wrong password' });
    }
    let token = jsonweb.sign(loginRecord.toJSON(), 'admin', {
      expiresIn: '1d',
    });
    return res.json({ 'token': token, 'msg': 'succesfully login' });
  },
};
