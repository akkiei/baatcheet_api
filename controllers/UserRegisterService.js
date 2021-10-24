const db = require("../models");
const User = db.UserModel;
const op = db.Sequelize.Op;
const getHashedPassword = require("../utils/hashPassword");
class UserRegistrationService {
  async CreateNewUser(params, body) {
    console.log(params, body);

    // add a validator for req body here and keep all the validators in a separate module
    //
    const userDetails = {
      username: body.username,
      password: await getHashedPassword(body.password),
    };
    // console.log(userDetails);
    try {
      const status = await User.create(userDetails);
      console.log(status);
      return {
        id: status.dataValues.id,
        username: status.dataValues.username,
      };
    } catch (err) {
      console.log(err.errors[0].message);
      return new Error(err.errors[0].message);
    }
  }
}

module.exports = UserRegistrationService;
