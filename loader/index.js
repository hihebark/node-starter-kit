module.exports.load = async () => {
  const app = await require('./express').start();
  const db = await require('./database').start();
  const cron = await require('./cron').start();
  return {app, db, cron};
}
