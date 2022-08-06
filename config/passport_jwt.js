const passport = require('passport');
const register = require('../models/admin');

const jwtStrategy = require('passport-jwt').Strategy;

const jwtExtarct = require('passport-jwt').ExtractJwt;

let opts = {
  jwtFromRequest: jwtExtarct.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'admin',
};

passport.use(
  new jwtStrategy(opts, (payload, done) => {
    register.findById(payload._id, (error, record) => {
      if (error) {
        console.log(`data not found in passport to database`);
        return false;
      }
      if (record) {
        return done(null, record);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser((record, done) => {
  return done(null, record._id);
});

passport.deserializeUser((record, done) => {
  register.findById(record._id, (error, record) => {
    if (error) {
      console.log(`deserialize error `);
      return false;
    }
    return done(null, record);
  });
});

module.exports = passport;
