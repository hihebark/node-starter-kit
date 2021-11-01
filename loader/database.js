module.exports.start = async () => {
  const mongoose = require('mongoose')
  , log = require('../commons/logger')
  , connect = await mongoose.connect(
    process.env.DATABASEURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  mongoose.Promise = global.Promise;
  // creating collection if they are not created!
  require('../db/schemas');
  log.info('Connecting to database... DONE!');
  return connect.connection;
}
