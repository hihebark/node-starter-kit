const mongoose = require('mongoose');
const process = require('process');

module.exports.connect = async () => {
  let connect = await mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  return connect.connection;
}
