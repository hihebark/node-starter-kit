const store = require('../modules/store.js');

/**
 * findStores
 * Route: /store
 *
 *  @async
 *
 *  @arg: req.query.query  @type string
 *  @arg: req.query.filter @type string
 *  @arg: req.query.limit  @type int
 *  @arg: req.query.offset @type int
 *
 *  @return Object
 **/
module.exports.findStores = async (req, res, next) => {
  try{
    let query  = req.query.query
    , filter   = req.query.filter
    , offset   = parseInt(req.query.offset, 10)
    , limit    = parseInt(req.query.limit, 10)
    , criteria = []
    , options  = {}
    ;
    if (query)  { criteria.push({name: {$regex: decodeURIComponent(query), $options: 'gis' } }) }
    if (filter) { criteria.push({categoryId: decodeURIComponent(filter)}) } // Nearest recomended, random
    if (criteria.length != 0) { options = {$and: criteria }}
    let response = await store.find(options, {offset: offset, limit: limit});
    if (response instanceof Error){
      res.status(400).send({state: false, error: response.message});
    } else {
      res.status(200).send({state: true, result: response});
    }
  } catch (err){
    console.log(err);
    next(err);
  }
}

/**
 * findStore
 * Route: /store/:storeid
 *
 *  @async
 *
 *  @param: req.params.storeid  @type mongoose.Schema.Types.ObjectId
 *
 *  @return Response
 **/
module.exports.findStore = async(req, res, next) => {
  try{
    let storeid = req.params.storeid;
    let response = await store.findOne(storeid);
    if (response instanceof Error){
      res.status(response.status).send({state: false, error: response.message});
    } else {
      res.status(200).send({state: true, result: response});
    }
  } catch (err) {
    next(err);
  }
}

module.exports.getStoreProducts = async (req, res, next) => {
  try {
    let storeid = req.params.storeid;
    let response = await store.getProducts(storeid);
    if (response instanceof Error){
      res.status(response.status).send({state: false, error: response.message});
    } else {
      res.status(200).send({state: true, result: response});
    }
  } catch (err) {
    next(err);
  }
}

module.exports.insertStore = async (req, res, next) => {
  try{
    let request = req.body.request;
    if(typeof request != undefined){
      let response = await store.create(request);
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

module.exports.updateStore = async (req, res, next) => {
  try{
    let request = req.body.request
    , id = request._id
    ;
    if(id == null || id === undefined || id == ''){
      res.status(400).send({state: false, error: 'Bad Request'});
    } else {
      let response = await store.update(request);
      if (response instanceof Error){
        res.status(400).send({state: false, error: response.message});
      } else {
        res.status(200).send({state: true, result: response});
      }
    }
  }catch(err){
    next(err);
  }
}

module.exports.deleteStore = async (req, res, next) => {
  try {
    let storeid = req.params.storeid;
    let response = await store.delete(storeid);
    if (response instanceof Error){
      res.status(response.status).send({state: false, error: response.message});
    } else {
      res.status(200).send({state: true, result: response});
    }
  } catch (err) {
    next(err);
  }
}
