const express = require('express');
const facultyController = require('../../../controllers/facultyController');
const passport = require('passport');
const routes = express.Router();

routes.post(
  '/register',
  passport.authenticate('jwt', { failureRedirect: false }),
  facultyController.registerData
);
routes.get('/viewFaculty', facultyController.viewFaculty);
routes.get('/viewStudent', facultyController.viewStudent);
routes.get('/findRecord', facultyController.findRecord);

module.exports = routes;
