const errorHundler = async (err, req, res, next) => {
  if (res.headersSent) next(err);
  __LOGGER.erro('-+'.repeat(32));
  __LOGGER.erro(err.stack);
  __LOGGER.erro('-+'.repeat(32));
  if (err['response'])
    __LOGGER.erro(err.response.status, err.response.data, err.response.headers);
  if (err['request'])
    __LOGGER.erro(err.request);
  if (err['trigger'] == 'MongoError') {
    if (err.name == 'ValidationError') {
      let errors = [];
      for (let i of Object.keys(err.errors)) { errors.push({[i]: err.errors[i].message}) }
      return res.status(400).send({success: false, error: 'Failed validating', error_codes: errors});
    }
  }
  res.status(500).send({success: false, error: 'An error has occurred. Please try again'});
}
module.exports = errorHundler;
