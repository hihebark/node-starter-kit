module.exports.UserFormatAdapter = (user) => {
  if (user == null) return null;
  return {
    _id: user._id,
    email: user.email,
    username: user.username,
    photo: user.photo ? process.env.PUBLIC_IMAGES+user.photo : null,
  };
}
