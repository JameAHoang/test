const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const LiveSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lives", LiveSchema);
