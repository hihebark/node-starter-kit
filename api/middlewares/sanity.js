const sanity = async (req, res, next) => {
  try {
    const mongoSanitize = require('express-mongo-sanitize')
    , log = require('../../commons/logger');
    for(const e of ['body', 'params', 'query']) {
      if (mongoSanitize.has(req[e])) {
        log.debug('Bad request detecte in: '+e+': '+JSON.stringify(req[e]));
        return res.status(401).send({success: false, error: 'Bad request'});
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = sanity;
