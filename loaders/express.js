const routes = require('../api/routes');
const bodyParser = require('body-parser');
const log = require('../api/middlewares')
const process = require('process');

module.exports.run = async (app) => {
  // Middlewares;
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({extended: true}));

  // Turnning on debug if it running on development mode;
  if (process.env.ISDEVELOPMENT == 'true'){
    app.use(log.dbg);
  }
  // Load routes into prefix;
  app.use('/store', routes);
  // Error Hundler;
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({state: false, errors: err.message});
    next();
  });
}
