const express = require("express");
const liveController = require("../controllers/liveController");

const router = express.Router();

let liveRoute = (app) => {
  //create live
  router.post("/", liveController.createLive);

  return app.use("/v1/live", router);
};

module.exports = liveRoute;
