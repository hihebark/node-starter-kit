module.exports = (router) => {
  const userController = require('../controllers/user')
    , PREFIX = '/users'
    , multer = require('multer');
  let storage;
  if (process.env.ISHEROKU) {
    storage = multer.memoryStorage();
  } else {
    storage = multer.diskStorage({
      destination: (req, file, cb) => { cb(null, './assets/public/images') },
      filename: (req, f, cb) => {
        ext = f.originalname.split('.')[f.originalname.split('.').length - 1];
        cb(null, Date.now()+'.'+ext)
      }
    });
  }
  let upload = multer({ storage: storage });

  router.post(`${PREFIX}/create`, upload.single('photo'), userController.create);
  router.post(`${PREFIX}/login`, userController.signin);
  
  router.post(`${PREFIX}/user/:username`, userController.findOne);
}
