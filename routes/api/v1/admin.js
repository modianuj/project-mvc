const express = require('express');
const passport = require('passport');
const routes = express.Router();
const adminController = require('../../../controllers/adminController');
const path = require('path');

routes.post('/register', adminController.registerData);
routes.get('/loginuser', adminController.loginData);
routes.use('/student', require('./student'));
routes.use('/faculty', require('./faculty'));

module.exports = routes;
