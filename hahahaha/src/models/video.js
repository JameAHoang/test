const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const VideoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    idLive: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lives",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videos", VideoSchema);
