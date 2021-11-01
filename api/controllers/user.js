const { jwt } = require('../../commons')
, bcrypt = require('bcrypt')
, { UserSchema } = require('../../db/schemas')
, { Validator } = require('bevor')
, { UserFormatAdapter } = require('../format_adapters');

const create = async (req, res, next) => {
  try {
    let { query } = req.body;

    if (!query)
      return res.status(400).send({success: false, error: 'Missing information'});

    const validator = new Validator(query, [
      { email: ['required', 'email'] },
      { username: ['required', 'string'] },
      { password: ['required', 'string'] },
    ]);

    if (!validator.validate())
      return res.status(400).send({
        success: false,
        errors_validation: validator.errors()
      });

    let user = new UserSchema({
      email: query.email,
      username: query.username,
      password: await bcrypt.hash(query.password.toString(), 10),
    });

    await user.save().then(async user => {
      res.set('Authorization', 'Bearer '+jwt.sign({ user_id: user._id }));
      res.status(200).send({ success: true, user: UserFormatAdapter(user) });
    }).catch(err => next(err));
  } catch(err) {
    next(err);
  }
}
module.exports.create = create;

const signin = async (req, res, next) => {
  try {
    let { query } = req.body;
    if (!query)
      return res.status(400).send({success: false, error: 'Missing information'});

    const validator = new Validator(query, [
      { auth: ['required', 'string'] },
      { password: ['required', 'string'] },
    ]);

    if (!validator.validate())
      return res.status(400).send({
        success: false,
        errors_validation: validator.errors()
      });

    let criteria = { $or: [ { username: query.auth }, { email: query.auth } ] };

    let user = await UserSchema.findOne(criteria).catch(err => next(err));
    if (!user)
      return res.status(404).send({success: false, error: 'User not found'});

    if (!bcrypt.compareSync(query.password, user.password))
      return res.status(400).send({success: false, error: 'Bad authentication'});

    res.set('Authorization', 'Bearer '+jwt.sign({ user_id: user._id }));
    res.status(200).send({ success: true, user: UserFormatAdapter(user) });
  } catch(err) {
    next(err);
  }
}
module.exports.signin = signin;

const getUser = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, user: UserFormatAdapter(req.user) });
  } catch(err) {
    next(err);
  }
}
module.exports.getUser = getUser;
