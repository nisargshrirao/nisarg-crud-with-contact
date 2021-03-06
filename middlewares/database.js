const mongoose = require('mongoose');
// here set the database url 
const { dbUri } = require('../config');

const connect = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };
    const connection = await mongoose.connect(dbUri, options);
    if(connection) console.log('\x1b[32m%s\x1b[0m', 'Database Connected Successfully...');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Error while connecting database\n');
    console.log(err);
  }
};

module.exports = {
  connect,
};
