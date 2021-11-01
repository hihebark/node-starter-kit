module.exports.start = async () => {
  const express = require('express')
    , app = express()
    , { jwt, cors, agarwood, errorHundler, sanity } = require('../api/middlewares')
    , routes = require('../api/routes')
    , helmet = require('helmet')
    , log = require('../commons/logger')
    , APIPATH = '/';

  app.use(helmet());
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(sanity);
  app.use(jwt);
  app.use(cors);
  app.use(agarwood);

  app.use('/healthz', (req, res) => {res.status(204).send()});
  app.use(APIPATH, routes);
  app.use(errorHundler);
  log.info('Setting the API... DONE!');
  return app;
}
