module.exports = (sequelize, Sequelize) => {
  const UserModel = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        // is: /^[0-9a-f]{64}$/i, can use regex for pwd
        validate: {
          len: [8, 100],
        },
      },
    },
    {
      tableName: "Users",
    }
  );
  return UserModel;
};
