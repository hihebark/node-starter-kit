let StoreSchema = require('../models/store.js');

const BADREQUEST = new Error('Bad Request');

/*******************************************************************************
 * Get array of collection with offset and limit of length of the array        *
 *  you can provide query to search in a the store collection                  *
 *  and filter the output.                                                     *
 * The output is without the products for a better benchmark.                  *
 ******************************************************************************/
module.exports.find = async (criteria, options) => {
  return StoreSchema.find(criteria)
    .skip(options.offset)
    .limit(options.limit)
    .select('-products')
    .then(result => { return result; }).catch(err => { return BADREQUEST; });
}

/*******************************************************************************
 * Get ONLY one store from the Store Schema the storeid param must not be      *
 *  undefined if so an error will be reported.                                 *
 ******************************************************************************/
module.exports.findOne = async (id) => {
  return StoreSchema.findById(id)
    .then(result => { return result }).catch(err => { return BADREQUEST });
}

module.exports.getProducts = async (id) => {
  return StoreSchema.findOne({_id: id}, {products: 1, _id: 0})
    .then(result => { return result }).catch(err => { return BADREQUEST });
}

module.exports.getCategorys = async (id) => {
  return StoreSchema.findOne({_id: id}, {categorys: 1, _id: 0})
    .then(result => { return result }).catch(err => { return BADREQUEST });
}

module.exports.create = async (request) => {
  let store = new StoreSchema(request);
  let err = store.validateSync();
  if (err)
    return err;
  return store.save()
    .then(result => { return result }).catch(err => { return BADREQUEST });
}

module.exports.update = async (id, request) => {
  return StoreSchema.updateOne({_id: id}, {$set: request})
    .then(result => { return result }).catch(err => { return BADREQUEST });
}

module.exports.delete = async (id) => {
  return StoreSchema.deleteOne({_id: id})
    .then(result => { return result }).catch(err => { return BADREQUEST });
}
