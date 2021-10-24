const express = require("express");
const router = express.Router();
const UserRegisterService = require("../controllers/UserRegisterService");
const UserLoginService = require("../controllers/UserLoginService");
const middleware = require("../middlewares");

// GET all users with valid JWT
// POC for middleware auth
router.get("/", middleware.isAuthorized, (req, res) => {
  res
    .send({
      data: "HI from /user",
    })
    .status(200);
});

// ADD/POST new user
router.post("/", async (req, res) => {
  const userRegisterService = new UserRegisterService();
  const reqBody = req.body;
  const reqParams = req.params;
  try {
    const status = await userRegisterService.CreateNewUser(reqParams, reqBody);
    if (status instanceof Error) {
      res.status(500).send(status.message);
    }
    res.status(201).send(status);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Authenticate user login
router.post("/login", async (req, res) => {
  try {
    const userLoginService = new UserLoginService();
    const reqBody = req.body;
    const status = await userLoginService.authenticateUser(
      reqBody.username,
      reqBody.password
    );
    if (status instanceof Error) throw status;
    console.log(status);
    res.cookie("jwt", status["x-auth-token"], {
      secure: false,
      httpOnly: true,
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
