const { default: mongoose } = require("mongoose");
const { env } = require("./environment");

//kết nối tới DB
const CONNECT_DB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB Clound`);
  } catch (error) {
    console.log(error, "error connect");
  }
};

module.exports = {
  CONNECT_DB,
};
