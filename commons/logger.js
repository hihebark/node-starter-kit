const logger = {
  info: (...msg) => { console.log(`\x1b[33m[*]\x1b[0m ${msg.join(' ')}`); },
  warn: (...msg) => { console.log(`\x1b[32m[!]\x1b[0m ${msg.join(' ')}`); },
  erro: (...msg) => { console.log(`\x1b[31m[?]\x1b[0m ${msg.join(' ')}`); },
  dbgg: (...msg) => { console.log(`\x1b[34m[+]\x1b[0m ${msg.join(' ')}`); },
}
module.exports = logger;
