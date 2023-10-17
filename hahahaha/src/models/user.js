const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lives",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
