module.exports = {
  jwt: require('./jwt'),
  cors: (req, res, next) => { next(); },
  sanity: require('./sanity'),
  agarwood: require('./agarwood'),
  errorHundler: require('./error-handler'),
}
