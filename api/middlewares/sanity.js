const sanity = async (req, res, next) => {
  try {
    const mongoSanitize = require('express-mongo-sanitize');
    for(e of ['body', 'params', 'query']){
      if (mongoSanitize.has(req[e])) {
        __LOGGER.dbgg('Bad request detecte in: '+e+': '+JSON.stringify(req[e]));
        return res.status(401).send({success: false, error: 'Bad request'});
      }
    };
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = sanity;
