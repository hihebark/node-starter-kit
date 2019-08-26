let router = require('express').Router();

require('./product')(router);
require('./store')(router);

module.exports = router;
