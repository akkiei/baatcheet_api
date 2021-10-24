const jwt = require("jsonwebtoken");

module.exports.isAuthorized = function (req, res, next) {
  // To check if user has valid JWT token in each request
  const token = req?.cookies?.jwt;
  console.log(req.cookies);
  if (!token) res.status(403).send();
  try {
    const payload = jwt.verify(token, "JWT_private_key");
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(403).send();
    }
    res.status(403).send();
  }
};
