const Video = require("../models/video");
const { SUCCESS } = require("../utils/Constant");

const videoController = {
  //GET ALL VIDEO
  getAllVideos: async (req, res) => {
    try {
      //get all video
      const newVideo = await Video.find();
      res.status(200).json({
        message: SUCCESS,
        data: newVideo,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //Get video by keyword
  getVideoByKeyword: async (req, res) => {
    try {
      const search = req?.body?.keyword;
      const video = await Video.findOne({
        keyword: { $regex: search, $options: "i" },
      });
      return res.status(200).json({
        message: SUCCESS,
        data: video,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //POST VIDEO
  createVideo: async (req, res) => {
    try {
      //Create new video
      const newVideo = await new Video({
        name: req.body.name,
        url: req.body.url,
        keyword: req.body.keyword,
      });

      //Save to DB
      const video = await newVideo.save();
      return res.status(200).json({
        message: SUCCESS,
        data: video,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = videoController;
