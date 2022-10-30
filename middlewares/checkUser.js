const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    next("Not Authenticated User!!!");
  }
};

module.exports = checkUser;
