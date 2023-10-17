const authenticateGoogle = require("../middleware/authGoogle");
const User = require("../models/user");
const { WebcastPushConnection } = require("tiktok-live-connector");
const { google } = require("googleapis");
const fs = require("fs");

let homePage = async (req, res) => {
  try {
    let tiktokUsername = req.body.username;
    let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);
    const io = req.app.get("io");
    // Connect to the chat (await can be used as well)
    tiktokLiveConnection
      .connect()
      .then((state) => {
        console.info(`Connected to roomId ${state.roomId}`);
      })
      .catch((err) => {
        console.error("Failed to connect", err);
      });

    tiktokLiveConnection.on("chat", (data) => {
      io.emit("receive_message", data);
      console.log(
        `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
      );
    });

    return res.status(200).send({
      username: tiktokUsername,
    });
  } catch (error) {
    console.log(error, "check");
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    console.log(result, "check ket qua");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let connect = async (req, res) => {
  try {
    let tiktokUsername = req.body.username;
    let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

    // Connect to the chat (await can be used as well)
    tiktokLiveConnection
      .connect()
      .then((state) => {
        console.info(`Connected to roomId ${state.roomId}`);
      })
      .catch((err) => {
        console.error("Failed to connect", err);
      });
    tiktokLiveConnection.on("chat", (data) => {
      console.log(
        `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
      );
    });
    return res.status(200).send("Connected success to " + tiktokUsername);
  } catch (error) {
    console.log(error, "check");
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["1rDmBRiLxcl4ILo2eKUJvkDb4YhlPi-6m"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

const uploadVideo = async (req, res) => {
  try {
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    console.log(response, "check");
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { homePage, createUser, uploadVideo };
