const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const argv = process.argv.slice(2);

let files = argv;

require('dotenv').config();

const db = require('../../loader/database.js');

db.start();

if (argv.length == 0) {
  files = fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });
}

files.forEach(async file => {
  const seeder = require(path.join(__dirname, file));
  await seeder.seed();
});
