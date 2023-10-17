const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");
const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
        address: req.body.address,
      });

      //Save to DB
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    console.log(user, "check login");
    return jwt.sign(
      {
        id: user.id,
        admin: user.isAdmin,
      },
      env.JWT_ACCESS_KEY,
      {
        expiresIn: "30d",
      }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Wrong email!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);

        const { password, ...others } = user._doc;

        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = authController;
