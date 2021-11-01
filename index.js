const log = require('./commons/logger.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000

const run = async () => {
  const loader = require('./loader');
  let {app, db, cron} = await loader.load();
  app.listen(PORT, () => {
    log.info(`App running and listening on: localhost:\x1b[32m${PORT}\x1b[0m`);
    log.info(`DataBase connected to: \x1b[32m${db.name}\x1b[0m`);
    log.info(`Cron started: \x1b[32m${cron.getTasks().length}\x1b[0m`);
    console.log();
  });
  return app;
}

console.log('     _             _                 _    _ _   ');
console.log(' ___| |_ __ _ _ __| |_ ___ _ __     | | _(_) |_ ');
console.log('/ __| __/ _` | \'__| __/ _ \\ \'__|____| |/ / | __|');
console.log('\\__ \\ || (_| | |  | ||  __/ | |_____|   <| | |_ ');
console.log('|___/\\__\\__,_|_|   \\__\\___|_|       |_|\\_\\_|\\__|');
console.log('');

log.warn(`Environment: { \x1b[32m${process.env.DEV_ENV.toUpperCase()}\x1b[0m }`);

process.removeAllListeners('uncaughtException');
process.on('uncaughtException', (err) => {
  console.log('Uncaught error : '+ err.message + '<br> stack : ' + err.stack);
  console.error('-------------------------------------------');
});
process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (reason) => {
  console.log('Unhandled promise rejection: ', reason.message, 'stack: ', reason.stack);
  console.error('-------------------------------------------');
});

module.exports = run();
