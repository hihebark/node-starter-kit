const { hide, jwt, crypt } = require('../../commons');

const create = async (req, res, next) => {
  try {
    const { UserSchema } = require('../../db/schemas/user');
    let { query } = req.body
      , user = {};
    if (!query)
      return res.status(400).send({success: false, error: 'Missing information'});
    user.email = query.email;
    user.username = query.username;
    user.password = query.password.toString();
    user.isConfirmed = false;
    if (req.file != undefined && req.file.buffer != undefined) {
      user.photo=`${process.env.PUBLIC_IMAGES}${user.username}-${req.file.filename}`;
    }
    user = new UserSchema(user);
    let err = user.validateSync();
    if (err)
      next({trigger: 'MongoError', ...err});
    await user.save().then(async user => {
      delete user['password'];
      res.status(200).send({ success: true });
    }).catch(err => {
      next({trigger: 'MongoError', ...err});
    });
  } catch(err) {
    next(err);
  }
}
module.exports.create = create;

const signin = async (req, res, next) => {
  try {
    const { UserSchema } = require('../../db/schemas/user');
    let { query } = req.body;
    if (!query || !query.auth || !query.password)
      return res.status(400).send({success: false, error: 'Missing information'});
    let criteria = {$or: [{username: query.auth}, {email: query.auth}]};
    UserSchema.findOne(criteria).then(async user => {
      if (!user)
        return res.status(404).send({success: false, error: 'User not found'});
      const { compareHashedPassword } = require('../../commons');
      if (!compareHashedPassword(query.password, user.password))
        return res.status(400).send({success: false, error: 'Bad authentication'});
      res.set('Authorization', 'Bearer '+jwt.sign({ _id: crypt.encrypt(user._id) }));
      delete user['password'];
      res.status(200).send({ success: true, user });
    }).catch(err => { next(err); });
  } catch(err) {
    next(err);
  }
}
module.exports.signin = signin;

const findOne = async (req, res, next) => {
  try {
    const { UserSchema } = require('../../db/schemas/user');
    let { username } = req.params;
    if (!username)
      return res.status(400).send({success: false, error: 'Missing information'})
    await UserSchema.findOne({ username }, '-password -__v').then(async user => {
      if (!user)
        return res.status(404).send({success: false, error: 'User not found'});
      return res.status(200).send({success: true, user});
    });
  } catch(err) {
    next(err);
  }
}
module.exports.findOne = findOne;
