const jsonwebtoken = require('jsonwebtoken')
, { readFileSync } = require('fs')
, options = {
    issuer: 'node_starter_kit',
    subject: 'request',
    audience: 'user',
    expiresIn: '7d',
    algorithm: 'RS256'
}
, private = readFileSync(__dirname+'/../assets/private.jwt.key', 'utf8')
, public = readFileSync(__dirname+'/../assets/public.jwt.key', 'utf8');
// to create those files refere to -> https://gist.github.com/hihebark/cd2f5df90cf184896bfbfafef1ad934b

const jwt = {
  sign: (payload) => {
    return jsonwebtoken.sign(payload, private, options);
  },
  verify: (token) => {
    try{
      return jsonwebtoken.verify(token, public, options);
    }catch (err) {
      console.log(err)
      return false;
    }
  },
  decode: (token) => {
    return jsonwebtoken.decode(token, {complete: true});
  }
}

module.exports = jwt;
