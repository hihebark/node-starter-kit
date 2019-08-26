const express = require('./express');
const mongoose = require('./mongoose');

module.exports.run = async(app) => {
  await express.run(app);
  let db = await mongoose.connect();
  db.once('open', () => { console.log('Mongodb opened'); });
  db.on('error', console.log.bind);
}
