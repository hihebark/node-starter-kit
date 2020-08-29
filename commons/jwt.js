const jsonwebtoken = require('jsonwebtoken')
, options = {
    issuer: 'gratify',
    subject: 'request',
    audience: 'user',
    expiresIn: "7d",
    algorithm: "RS256"
}
, private = require('fs').readFileSync(__dirname+'/../assets/private.jwt.key', 'utf8')
, public = require('fs').readFileSync(__dirname+'/../assets/public.jwt.key', 'utf8');

const jwt = {
  sign: (payload) => {
    return jsonwebtoken.sign(payload, private, options);
  },
  verify: (token) => {
    try{
      return jsonwebtoken.verify(token, public, options);
    }catch (err){
      return false;
    }
  },
  decode: (token) => {
    return jsonwebtoken.decode(token, {complete: true});
  }
}

module.exports = jwt;
