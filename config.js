const process = require('process');
if (process.env.PORT === undefined || process.env.PORT === '')
  process.env.PORT = 31415;

if (process.env.ISDEVELOPMENT === undefined || process.env.ISDEVELOPMENT === '')
  process.env.ISDEVELOPMENT = 'true';

if (process.env.DATABASEURL === undefined || process.env.DATABASEURL === '')
  process.env.DATABASEURL = 'mongodb://localhost:27020/nodeproof';
