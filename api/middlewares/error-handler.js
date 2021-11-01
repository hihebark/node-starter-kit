const errorHundler = async (err, req, res, next) => {
  const { http_errors } = require('../../commons/errors');
  if (res.headersSent) next(err);
  const log = require('../../commons/logger');
  log.error('-+'.repeat(32));
  log.error((err.stack || JSON.stringify(err)));
  log.error('-+'.repeat(32));
  if (err['response'])
    log.error(err.response.status, JSON.stringify(err.response.data));
  if (err['request'])
    log.error(err.request);
  if (err.name == 'ValidationError') {
    let validation = [];
    for (let e of Object.keys(err.errors)) {
      validation.push({[e]: err.errors[e].message});
    }
    return res.status(200).send({success: false, error: validation});
  }
  return res.status(200).send({
    success: false,
    error: (
      process.env.DEV_ENV == 'production' ?
      http_errors.default : { message: err.message, code: 'unknown' }
    )
  });
}
module.exports = errorHundler;
