module.exports = (r, res, next) => {
  const log = require('../../commons/logger')
  , route = r.originalUrl
  , d = new Date()
  , date = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes()
  , user = r.user != undefined ? r.user._id : null
  , dbg = ` > [${process.env.APP_NAME}] [ ${date} ], [ ${r.method} ], ${route}, ${r.ip}\n-----| [${process.env.APP_NAME}] [ ${date} ], Headers: ${JSON.stringify(r.headers)}\n-----| [${process.env.APP_NAME}] [ ${date} ], Body: ${JSON.stringify(r.body) || 'null'}\n-----| [${process.env.APP_NAME}] [ ${date} ], User: ${user}\n`;
  log.debug(dbg);
  next()
}
