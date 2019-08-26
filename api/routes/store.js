const controller = require('../../controllers/store');

module.exports = (router) => {
  router.get('/', controller.findStores);
  router.get('/:storeid', controller.findStore);
  router.get('/:storeid/products', controller.getStoreProducts);

  router.post('/', controller.insertStore);
  router.put('/', controller.updateStore);
  router.delete('/:storeid', controller.deleteStore);
}
