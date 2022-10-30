const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);

  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      next({
        message: "Already Exit's!!!",
      });
    } else {
      const user = new User({
        username,
        email,
        password: hasedPassword,
      });

      await user.save();

      const token = await jwt.sign(
        {
          userEmail: email,
          userId: user._id,
        },
        process.env.JWT_SECRET
      );
      res.json({
        message: "User Created Succesfully!!!",
        userToken: token,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      const comparedPassword = await bcrypt.compare(
        password,
        userExits.password
      );
      if (comparedPassword) {
        const token = await jwt.sign(
          {
            userEmail: email,
            userId: userExits._id,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          message: "Login succesfull!",
          userToken: token,
        });
      } else {
        next("Invalid creadential's");
      }
    } else {
      next("User not found!!!!");
    }
  } catch (error) {
    next("Authentication faild!");
  }
});

module.exports = router;
