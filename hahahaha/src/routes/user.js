const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

let userRoute = (app) => {
  //GET ALL USER
  router.get("/", authMiddleware.verifyToken, userController.getAllUsers);

  //GET A NEW USER
  router.get("/:id", authMiddleware.verifyToken, userController.getUserById);

  //UPDATE PROFILE USER

  router.put(
    "/:id",
    authMiddleware.verifyToken,
    userController.updateUserProfile
  );

  //DELETE USER
  router.delete(
    "/:id",
    authMiddleware.verifiyTokenAndAdminAuth,
    userController.deleteUser
  );

  //CHANGE PASSWORD
  router.put(
    "/changepass/:id",
    authMiddleware.verifyToken,
    userController.changePassUser
  );

  return app.use("/v1/user", router);
};

module.exports = userRoute;
