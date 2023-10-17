const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { CONNECT_DB } = require("./config/mongodb");
const { env } = require("./config/environment");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const socketio = require("./socketio/socketio");
const initWebRoutes = require("./routes/web");
const videoRoute = require("./routes/video");
const cookieParser = require("cookie-parser");
const liveRoute = require("./routes/live");
const START_SERVER = () => {
  const app = express();
  app.use(cors({ credentials: true, origin: true }));

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  //Routes
  authRoute(app);
  userRoute(app);
  videoRoute(app);
  liveRoute(app);
  initWebRoutes(app);

  // Use cookie
  app.use(cookieParser());

  //connect socket.io
  const http = require("http");

  const server = http.createServer(app);

  const io = socketio(server);

  app.set("io", io);

  let port = env.APP_PORT || 6969; // Nếu port undefind => port 6969

  server.listen(port, () => {
    console.log("Server is running");
  });

  // app.listen(port, () => {
  //   //callback
  //   console.log("Backend Nodejs is runninng on the port :" + port);
  // });
};

CONNECT_DB();
START_SERVER();
