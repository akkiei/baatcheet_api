const bcrypt = require("bcrypt");

getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  return hashedPwd;
};

module.exports = getHashedPassword;
