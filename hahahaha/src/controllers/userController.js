const User = require("../models/user");
const { SUCCESS, FAILED } = require("../utils/Constant");
const bcrypt = require("bcrypt");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("lives").select("-password");
      if (users) {
        return res.status(200).json({
          message: SUCCESS,
          data: users,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //GET A USER
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("lives")
        .select("-password");
      if (user) {
        return res.status(200).json({
          message: SUCCESS,
          data: user,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //UPDATE A USER
  updateUserProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const options = { new: true };
      const user = await User.findByIdAndUpdate(id, data, options);
      if (user) {
        return res.status(200).json({
          message: SUCCESS,
          data: user,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const userDelete = await User.findByIdAndDelete(id);
      if (userDelete) {
        return res.status(200).json({
          message: SUCCESS,
          data: { id: userDelete.id },
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //CHANGE PASS
  changePassUser: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const id = req.params.id;
      console.log(currentPassword, newPassword, req.params.id);
      if (currentPassword === newPassword) {
        return res.status(400).json("Old password matches new password");
      }
      const user = await User.findById(id);

      if (user) {
        const check = await bcrypt.compareSync(currentPassword, user.password);
        if (check) {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(newPassword, salt);
          user.password = hashed;
          const updatePassword = await user.save();
          if (updatePassword) {
            return res.status(200).json({
              message: SUCCESS,
            });
          } else {
            return res.status(400).json("Input data invalid");
          }
        } else {
          return res.status(400).json("Wrong password");
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
