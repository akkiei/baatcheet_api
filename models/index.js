const dbConfig = require("../database/db.config");
const Sequelize = require("sequelize");
const UserModel = require("./User");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.acquire,
  },
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

/// add all the models here and pass the 
database.UserModel = UserModel(sequelize, Sequelize);;

module.exports = database;
