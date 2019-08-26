console.log('          #                      ##'); 
console.log('##  ### ### ### ### ### ### ###  # '); 
console.log('# # # # # # ##  # # #   # # # # ###'); 
console.log('# # ### ### ### ### #   ### ###  # '); 
console.log('                #        v1.0.0 ## '); 
require('./config');
let startServer = async () => {
  const app = require('express')();
  const process = require('process');
  await require('./loaders').run(app);
  
  app.listen(process.env.PORT, err => {
    if (err) {
      // If error we dont want to exit the program but to reload it
      // with #pm2 or #forever
      log.err(err);
      return
    }
    console.log('# Is running on "Development":', process.env.ISDEVELOPMENT);
    console.log('# Binding on:', process.env.PORT);
  });
}
startServer();
