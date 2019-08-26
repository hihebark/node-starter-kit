let StoreSchema = require('../models/store.js');
let ProductSchema = require('../models/product.js');

const BADREQUEST = new Error('Bad Request');
const INVALIDSCHEMA = new Error('Invalid Schema');

module.exports.find = async (criteria, projection, options) => {
  return StoreSchema.find(criteria, projection)
  .select('products -_id')
  .skip(options.offset)
  .limit(options.limit)
  .then(result => { return result; }).catch(err => { return BADREQUEST; });
}

module.exports.findOne = async (criteria, projection) => {
  return StoreSchema.findOne(criteria, projection)
  .select('products')
  .then(result => { return result; }).catch(err => { return BADREQUEST; });
}
module.exports.create = async (storeid, request) => {
  let product = new ProductSchema(request);
  if (product.validateSync())
    return INVALIDSCHEMA;

  return StoreSchema.findOneAndUpdate(
    { _id: storeid },
    { $push: { products: request } },
    { safe: true, upsert: true }
  )
  .then(result => { return result; }).catch(err => { return BADREQUEST; });
}
module.exports.update = async (storeid, request) => {

  if (new ProductSchema(request).validateSync())
    return INVALIDSCHEMA;

  return StoreSchema.findOneAndUpdate(
    {_id: storeid, 'products._id': request._id},
    {$set: {products: request}}
  )
  .then(result => { return result; }).catch(err => { return BADREQUEST; });
}

module.exports.delete = async (storeid, productid) => {
  return ProductSchema.deleteOne({_id: productid})
    .then(result => {
      return StoreSchema.update({_id: storeid}, {$pull: {'products.$': productid}})
        .then(result => { return "Done"; }).catch(err => { return BADREQUEST });
    }).catch(err => {return BADREQUEST});
}

