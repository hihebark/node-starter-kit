module.exports.start = async () => {
  let express = require('express')
    , app = express()
    , { jwt, cors, logger, errorHundler, sanity } = require('../api/middlewares')
    , routes = require('../api/routes')
    , helmet = require('helmet');
  const APIPATH = '/';

  app.use(helmet());
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(sanity);
  app.use(jwt);
  app.use(cors);
  app.use(logger);

  app.use('/healthz', (req, res) => {res.status(204).send()});
  app.use(APIPATH, routes);
  app.use(errorHundler);
  __LOGGER.info('Setting the API... DONE!');
  return app;
}
