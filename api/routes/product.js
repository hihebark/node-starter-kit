const controller = require('../../controllers/product');

module.exports = (router) => {
  router.get('/:storeid/products/:productid', controller.findProduct);
  router.post('/:storeid/products', controller.insertProduct);
  router.put('/:storeid/products', controller.updateProduct);
  router.delete('/:storeid/products/:productid', controller.deleteProduct);
}
