const product  = require('../modules/product');

module.exports.findProducts = async (req, res, next) => {
  try {
    let storeid = req.params.storeid
    , query     = req.query.query
    , filter    = req.query.filter
    , limit     = parseInt(req.query.limit, 10)
    , offset    = parseInt(req.query.offset, 10)
    , criteria  = []
    , options   = {}
    , projection = {}
    ;
    if(storeid){ criteria.push({_id: storeid}) }
    if(query){
      criteria.push({
        'products.name': {
          $regex: decodeURIComponent(query), 
          $options: 'gis' 
        } 
      });
      projection = {'products.$': 1}
    }
    if(filter){
      criteria.push({
        'products.categoryId': decodeURIComponent(filter)
      });
    }
    if(criteria.length != 0){ options = {$and: criteria} }
    let response = await product.find(options, projection, {offset: offset, limit: limit});
    if (response instanceof Error){
      res.status(400).send({state: false, error: response.message});
    } else {
      res.status(200).send({state: true, result: response});
    }
  } catch (err) {
    next(err);
  }
}

module.exports.findProduct = async (req, res, next) => {
  try {
    let storeid = req.params.storeid
    , productid = req.params.productid
    ;
    if (typeof storeid != undefined && typeof productid != undefined){
      let criteria = {$and: [{_id: storeid}, {'products._id': productid}]}
      , projection = {'products.$': 1};
      let response = await product.findOne(criteria, projection);
      if (response instanceof Error){
        res.status(400).send({state: false, error: response.message});
      } else {
        res.status(200).send({state: true, result: response});
      }
    } else {
      res.status(400).send({state: false, error: 'Bad Request'});
    }
  } catch (err) {
    next(err);
  }
}

module.exports.insertProduct = async (req, res, next) => {
  try {
    let storeid = req.params.storeid
    , request = req.body
    ;
    if(typeof request != undefined && typeof storeid != undefined){
      let response = await product.create(storeid, request);
      if (response instanceof error){
        res.status(400).send({state: false, error: response.message});
      } else {
        res.status(200).send({state: true, result: response});
      }
    } else {
      res.status(400).send({state: false, error: 'Bad Request'});
    }
  
  } catch (err){
    next(err);
  }
}

module.exports.updateProduct = async (req, res, next) => {
  try {
    let storeid = req.params.storeid
    , request = req.body
    ;
    if(typeof request != undefined && typeof storeid != undefined){
      let response = await product.update(storeid, request);
      if (response instanceof error){
        res.status(400).send({state: false, error: response.message});
      } else {
        res.status(200).send({state: true, result: response});
      }
    } else {
      res.status(400).send({state: false, error: 'Bad Request'});
    }
  } catch (err){
    next(err);
  }
}

module.exports.deleteProduct = async (req, res, next) => {
  try {
    let storeid = req.params.storeid
    , productid = req.params.productid
    ;
    if(typeof productid != undefined && typeof storeid != undefined){
      let response = await product.delete(storeid, productid);
      if (response instanceof error){
        res.status(400).send({state: false, error: response.message});
      } else {
        res.status(200).send({state: true, result: response});
      }
    } else {
      res.status(400).send({state: false, error: 'Bad Request'});
    }
  } catch (err) {
    next(err);
  }
}
