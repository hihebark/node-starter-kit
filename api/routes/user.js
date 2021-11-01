module.exports = (router) => {
  const userController = require('../controllers/user')
    , PREFIX = '/users';

  router.post(`${PREFIX}/signup`, userController.create);
  router.post(`${PREFIX}/signin`, userController.signin);
  
  router.get(`${PREFIX}/user`, userController.getUser);
}
