let mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');
const { errors } = require('../../commons/errors');

let UserSchema = new Schema({
  username: {
    type: String, trim: true, index: true,
    minlength: [5, errors.VALIDATIONMIN], maxlength: [32, errors.VALIDATIONMAX],
    required: [true, errors.REQUIRED],
    unique: [true, errors.UNIQUE],
    match: [/^[a-zA-Z][\w\d]{4,31}$/, errors.VALIDATION]
  },
  email: {
    type: String,
    lowercase: true, index: true,
    required: [true, errors.REQUIRED],
    unique: [true, errors.UNIQUE],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, errors.VALIDATION]
  },
  password: { type: String, required: false, minlength: [5, errors.VALIDATIONMIN] },
  birthdate: {
    type: Date, required: true,
  },
  photo: { type: String, required: false },
  passwordRecovery: { type: String, required: false },
  isConfirmed: { type: Boolean },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: errors.UNIQUE });

UserSchema.pre('save', async function(next) {
  if (this.password) {
    const { hashPassword } = require('../../commons');
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports.UserSchema = __DB.model('users', UserSchema);
