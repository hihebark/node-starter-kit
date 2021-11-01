const jwt = async (req, res, next) => {
  let authorized = [
    {path: '/healthz$', method: 'POST'},
    {path: '/users/signup$', method: 'POST'},
    {path: '/users/signin$', method: 'POST'},
  ];
  if (authorized.findIndex(v =>
      new RegExp(v.path).test(req.path) && v.method == req.method) != -1) {
    next();
  } else {
    try {
      const { http_errors } = require('../../commons/errors')
      if (req.header('Authorization')) {
        const { jwt } = require('../../commons')
        , { UserSchema } = require('../../db/schemas')
        , token = req.header('Authorization').replace('Bearer ', '')
        , data = jwt.verify(token);
        if (data) {
          const user = await UserSchema.findOne({ _id: data.user_id });
          if(!user)
            res.status(401).send({
              success: false, error: http_errors.unauthorized_request
            });
          req.user = user;
          next();
        } else {
          return res.status(200).send({
            success: false, error: http_errors.expired_token
          });
        }
      } else {
        return res.status(200).send({
          success: false, error: http_errors.bad_request
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = jwt;
