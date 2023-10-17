const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

let authRoute = (app) => {
  //REGISTER
  router.post("/register", authController.registerUser);

  //LOGIN
  router.post("/login", authController.loginUser);

  return app.use("/v1/auth", router);
};

module.exports = authRoute;
