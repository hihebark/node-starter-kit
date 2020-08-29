global.__LOGGER = require('./commons/logger.js');

require('dotenv').config();
const PORT = process.env.PORT || 3000

const run = async () => {
  const loader = require('./loader');
  let {app, db} = await loader.load();
  app.listen(PORT, () => {
    __LOGGER.info(`App running and listening on: localhost:\x1b[32m${PORT}\x1b[0m`);
    __LOGGER.info(`DataBase connected to: \x1b[32m${db.name}\x1b[0m`);
    console.log();
  });
  return app;
}

__LOGGER.warn(`Environment: { \x1b[32m${process.env.DEV_ENV.toUpperCase()}\x1b[0m }`);

process.removeAllListeners('uncaughtException');
process.on('uncaughtException', (err, origin) => {
  console.error('-+'.repeat(32));
  console.log('Uncaught error : '+ err.message + '<br> stack : ' + err.stack);
  console.error('-+'.repeat(32));
});
process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (reason, promise) => {
  console.error('-+'.repeat(32));
  console.log('Unhandled promise rejection : '+ reason.message + '<br> stack : ' + reason.stack);
  console.error('-+'.repeat(32));
});

module.exports = run();
