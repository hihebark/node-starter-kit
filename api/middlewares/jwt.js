const jwt = async (req, res, next) => {
  let authorized = [
    {path: '/users/create$', method: 'POST'},
    {path: '/users/login$', method: 'POST'},
    {path: '/users/forget_password$', method: 'POST'},
    {path: '/users/reset_password/*', method: 'POST'},
  ];
  if (authorized.find(v => new RegExp(v.path).test(req.path))) {
    next();
  } else {
    try {
      if (req.header('Authorization')) {
        const { jwt, crypt } = require('../../commons');
        const { UserSchema } = require('../../db/schemas/user');
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token);
        if (data && data != null) {
          await UserSchema.findOne({ _id: crypt.decrypt(data._id) }).then(user => {
            req.user = user;
            next();
          }).catch(err => {
            res.status(401).send({success: false, error: 'Unauthorized request'});
          });
        }
      } else {
        res.status(401).send({success: false, error: 'Unauthorized request'});
      }
    } catch (err) {
      res.status(500).send({
        success: false, error: 'An error has occurred. Please try again'
      });
    }
  }
}
module.exports = jwt;
