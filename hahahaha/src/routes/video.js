const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

let videoRoute = (app) => {
  //CREATE VIDEO
  //GET ALL USER
  router.post("/create", videoController.createVideo);
  router.get("/getAll", videoController.getAllVideos);
  router.post("/getByKeyword", videoController.getVideoByKeyword);
  return app.use("/v1/video", router);
};

module.exports = videoRoute;
