const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const db = require("./models");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());

(async function () {
  console.log("Syncing DB");
  await db.sequelize.sync();
  //   KEEP THIS WHILE DEPLOYING.
  //   await db.sequelize.sync({ force: true });
})();

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(8800, () => console.log(`listening on port 8800`));

module.exports = app;
