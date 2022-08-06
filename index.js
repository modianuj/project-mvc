const express = require('express');

const app = express();
const host = 'localhost';
const port = 5000;

// config for database
const db = require('./config/mongoose');

// config for passport
const jwtPassport = require('./config/passport_jwt');
const session = require('express-session');
const passport = require('./config/passport_jwt');
app.use(
  session({
    name: 'collegeData',
    secret: 'admin',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 1000 * 100,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// urlencoded
app.use(express.urlencoded({ extended: true }));

// routes configuation
app.use('/', require('./routes/api/v1/admin'));

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
