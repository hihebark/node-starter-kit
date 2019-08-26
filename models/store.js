'use strict';

const ProductSchema = require('./product.js');
const mongoose      = require('mongoose');

const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let StoreSchema = new Schema({
  name:         {type: String,   required: true},
  email:        {type: String,   required: true},
  password:     {type: String,   required: true},
  address:      {type: String,   required: true, trim: true},
  phoneNumber:  [{type: String,  required: true}],
  profilImage:  {type: String,   required: false},

  location:     {type: String,   required: false, trim: true},
  description:  {type: String,   required: false},
  images:       {type: Array,    required: false},
  zip:          {type: Number,   required: false},
  availability: {type: Boolean,  required: false, default: false},
  products:     [{type: ObjectId, required: false, ref: 'products'}],

  created_at:   {type: Date, default: Date.now()},
  updated_at:   {type: Date, default: Date.now()},
});

StoreSchema.pre('updateOne', (next) => {
  this.update({},{ $set: { updated_at: new Date() } });
  next();
});

module.exports = mongoose.model('store', StoreSchema);
