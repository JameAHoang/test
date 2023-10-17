const express = require("express");
const homeController = require("../controllers/homeController");
const multer = require("multer");
const fsExtra = require("fs-extra");

const router = express.Router();

let initWebRoutes = (app) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = "uploads";
      if (!fsExtra.existsSync(path)) {
        fsExtra.mkdirSync(path);
      }

      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  router.post("/", homeController.homePage);
  router.post("/create-user", homeController.createUser);

  router.post(
    "/upload-video",
    upload.single("file"),
    homeController.uploadVideo
  );
  return app.use("/", router);
};

module.exports = initWebRoutes;
