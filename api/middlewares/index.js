const cors = async (req, res, next) => { next(); }
const logger = require('./logger');
const errorHundler = require('./error-handler');
const jwt = require('./jwt')
const sanity = require('./sanity')

module.exports = {
  jwt,
  cors,
  sanity,
  logger,
  errorHundler
}
