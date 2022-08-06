const express = require('express');
const studentController = require('../../../controllers/studentController');
const routes = express.Router();
const passport = require('passport');

routes.post(
  '/register',
  passport.authenticate('jwt', { failureRedirect: false }),
  studentController.registerStudent
);

module.exports = routes;
