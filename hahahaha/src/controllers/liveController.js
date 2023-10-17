const Live = require("../models/live");
const User = require("../models/user");
const { SUCCESS, FAILED } = require("../utils/Constant");

const liveController = {
  //CREATE A lIVE
  createLive: async (req, res) => {
    try {
      const newLive = new Live(req.body);
      const savedLive = await newLive.save();
      if (req.body.user_id) {
        const user = User.findById(req.body.user_id);
        await user.updateOne({ $push: { lives: savedLive.id } });
      }

      return res.status(200).json({
        message: SUCCESS,
        data: savedLive,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = liveController;
