const { Server } = require("socket.io");
const { WebcastPushConnection } = require("tiktok-live-connector");

const socketio = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_username", (message) => {
      console.log("Tin nhắn từ máy khách:", message);

      let tiktokLiveConnection = new WebcastPushConnection(message);
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

      socket.on("disconnect", () => {
        console.log(`User Disconnected :  ${socket.id}`);
        if (tiktokLiveConnection) {
          tiktokLiveConnection.disconnect();
        }
      });
    });
  });
  return io;
};

module.exports = socketio;
