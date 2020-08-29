module.exports = (r, res, next) => {
  let route = r.originalUrl
    , timestamp = Date.now()
    , user = r.user != undefined ? r.user._id : null
    , dbg = ` > [ ${timestamp} ], [ ${r.method} ], ${route}, ${r.ip}\n   --| [ ${timestamp} ], Headers: ${JSON.stringify(r.headers)}\n   --| [ ${timestamp} ], Body: ${JSON.stringify(r.body) || 'null'}\n   --| [ ${timestamp} ], User: ${user}\n`;
  __LOGGER.dbgg(dbg);
  next()
}
