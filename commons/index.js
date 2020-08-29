let bcrypt = require('bcrypt');

const codeGenerator = async (length = 32) => {
  let code = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < length; i++ )
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;//await bcrypt.hash(code, 10);
}
module.exports.codeGenerator = codeGenerator;

const hashPassword = (password) => { return bcrypt.hashSync(password, 10); }
module.exports.hashPassword = hashPassword;

const compareHashedPassword = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
}
module.exports.compareHashedPassword = compareHashedPassword;

const hide = async (obj, keys) => {
  obj = JSON.parse(JSON.stringify(obj));
  for(let o of Object.keys(obj)) {
    if (keys.findIndex(v => v === o) >= 0) {
      delete obj[o]
    }
  }
  return obj;
}
module.exports.hide = hide;

module.exports.jwt = require('./jwt');

const crypt = {
  encrypt: (plain) => {
    plain = plain.toString();
    const algorithm = 'aes-256-cbc';
    const key       = 'oQwGicIJvt7WR2wvmpdXAcu6Ls1DN1cK';
    const crypto = require('crypto');
    const iv = crypto.randomBytes(16);
    const aes = crypto.createCipheriv(algorithm, key, iv);
    let ciphertext = aes.update(plain);
    ciphertext = Buffer.concat([iv, ciphertext, aes.final()]);
    return ciphertext.toString('base64');
  },
  decrypt: (cipher) => {
    const algorithm = 'aes-256-cbc';
    const key       = 'oQwGicIJvt7WR2wvmpdXAcu6Ls1DN1cK';
    let crypto = require('crypto');
    const ciphertextBytes = Buffer.from(cipher, 'base64')
    , iv = ciphertextBytes.slice(0, 16)
    , data = ciphertextBytes.slice(16)
    , aes = crypto.createDecipheriv(algorithm, key, iv);
    let plaintextBytes = Buffer.from(aes.update(data));
    plaintextBytes = Buffer.concat([plaintextBytes, aes.final()]);
    return plaintextBytes.toString();
  }
}
module.exports.crypt = crypt;

const getDay = () => {
  return {
    from: new Date().setHours(0,0,0,0),
    to: new Date().setHours(23,59,59,999)
  }
}
module.exports.getDay = getDay;

const getWeek = () => {
  let nowf = new Date()
  , nowt = new Date();
  return {
    from: new Date(nowf.setDate(nowf.getDate() - nowf.getDay() - 1)).setHours(0,0,0,0),
    to: new Date(nowt.setDate(nowt.getDate() - nowt.getDay() + 5)).setHours(23,59,59,999)
  }
}
module.exports.getWeek = getWeek;

const getMonth = (now = new Date()) => {
  return {
    from: new Date(now.getFullYear(), now.getMonth(), 1).setHours(0,0,0,0),
    to: new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(23,59,59,999)
  }
}
module.exports.getMonth = getMonth;

const getYear = (now = new Date()) => {
  let nowf = new Date()
  , nowt = new Date();
  return {
    from: new Date(now.getFullYear(), 0, 1).setHours(0,0,0,0),
    to: new Date(now.getFullYear(), 12, 0).setHours(23,59,59,999)
  }
}
module.exports.getYear = getYear;

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
module.exports.shuffle = shuffle;
