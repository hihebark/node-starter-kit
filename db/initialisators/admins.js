const seed = async () => {
  const { UserSchema } = require('../schemas/users');
  const bcrypt = require('bcrypt');

  console.log('[+] Seed Admins');

  let password = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : 'password';
  password = await bcrypt.hash(password, 10);

  await UserSchema.insertMany([
    {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: password.replace(/^\$2b/, "$2y"),
    },
  ]);
}
module.exports.seed = seed;
