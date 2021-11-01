const mongoose = require('mongoose')
, Schema   = mongoose.Schema
, uniqueValidator = require('mongoose-unique-validator')
, { errors_db } = require('../../commons/errors');

let UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    index: true,
    minlength: [5, errors_db.VALIDATIONMIN],
    maxlength: [32, errors_db.VALIDATIONMAX],
    required: [true, errors_db.REQUIRED],
    unique: [true, errors_db.UNIQUE],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, errors_db.REQUIRED],
    unique: [true, errors_db.UNIQUE],
    index: true,
  },
  password: {
    type: String,
    required: false,
    minlength: [5, errors_db.VALIDATIONMIN]
  },
  photo: { type: String, required: false },
  isConfirmed: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: errors_db.UNIQUE });

module.exports.UserSchema = mongoose.model('users', UserSchema);
