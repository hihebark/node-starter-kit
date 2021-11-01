module.exports.start = async () => {
  const cron = require('node-cron');

  //cron.schedule('0 12 * * *', async () => {
  //  const my_cron  = require('../crons/my_cron');
  //  await my_cron().catch(e => e);
  //}, {
  //   scheduled: true,
  //   timezone: ""
  //});
  return cron;
}
