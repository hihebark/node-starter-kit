module.exports.start = async () => {
  let DBURL = (process.env.DEV_ENV == 'production') ? 
    process.env.DATABASEURLPROD : (process.env.DEV_ENV == 'local') ? 
    process.env.DATABASEURLDEV : 'mongodb://localhost:27017/test';
  let mongoose = require('mongoose');
  let connect = await mongoose.connect(
    DBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  mongoose.Promise = global.Promise;
  __LOGGER.info('Connecting to database... DONE!');
  return connect.connection;
}
