const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';

mongoose.connect(`${url}/projectcollege`);

const db = mongoose.connection;

db.once(`error`, console.error.bind(`error`, `database error to open`));

db.on('open', (error) => {
  if (error) {
    console.log(`database opening problem`);
  }
  console.log(`database succesfully opened`);
});

module.exports = db;
