const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

require('dotenv').config();

const db = require('../../loader/database.js');

db.start();

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(async file => {
    const seeder = require(path.join(__dirname, file));
    await seeder.seed();
  });
