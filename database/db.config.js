module.exports = {
  HOST: "localhost",
  USER: "test",
  PASSWORD: "test123",
  DB: "testDb",
  DIALECT: "postgres",
  PORT : 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 300000,
  },
};
