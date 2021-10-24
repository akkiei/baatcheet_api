const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.UserModel;
const op = db.Sequelize.Op;

class UserLoginService {
  async authenticateUser(username, password) {
    const isUser = await User.findOne({
      where: {
        username: username,
      },
    });
    console.log(isUser);
    const checkUser = await bcrypt.compare(
      password,
      isUser.dataValues.password
    );
    console.log(checkUser);

    if (checkUser === false) return new Error("incorrect user/pass");
    const jwToken = jwt.sign(
      {
        username: username,
      },
      "JWT_private_key",
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
    const result = {};
    result["x-auth-token"] = jwToken;
    return result;
  }
}

module.exports = UserLoginService;
