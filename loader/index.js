module.exports.load = async () => {
  const app = await require('./express.js').start();
  const db = await require('./database.js').start();
  return {app: app, db: db};
}
