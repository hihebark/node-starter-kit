let mongoose = require('mongoose');

const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let ProductSchema = new Schema({
    name:          {type: String,   required: true, trim: true},
    price:         {type: Number,   required: true},
    categoryId:    {type: ObjectId, required: true, ref: 'categorys'},

    description:   {type: String,   required: false, trim: true},
    tag:           {type: String,   required: false},
    unit:          {type: String,   required: false},
    image:         {type: String,   required: false},
    discountPrice: {type: Number,   required: false, default: 0},
    availability:  {type: Boolean,  required: false},

    created_at:    {type: Date, default: Date.now()},
    updated_at:    {type: Date, default: Date.now()},
  },
  {
    select: false,
  }
);

ProductSchema.pre('updateOne', (next) => {
  this.update({},{ $set: { updated_at: new Date() } });
  next();
});

module.exports = mongoose.model('product', ProductSchema);
module.exports = ProductSchema;
