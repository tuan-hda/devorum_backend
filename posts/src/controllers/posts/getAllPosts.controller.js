const PostModel = require("../../models/Post");
const getAllPosts = async (res, next) => {
  try {
    const allPosts = await PostModel.find()
      .populate("user")
      .populate("tag")
      .exec();
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;
