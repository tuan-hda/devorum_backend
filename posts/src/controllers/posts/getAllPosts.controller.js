const PostModel = require("../../models/Post");
const getUserById = require("../../utils/gRPC");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    console.log(
      "🚀 ~ file: getAllPosts.controller.js:8 ~ getAllPosts ~ limit:",
      limit
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allPosts = await PostModel.find();
    // .populate("user");
    // .populate("tag")
    // .exec();
    // res.status(200).json(allPosts.slice(startIndex, endIndex));
    const user = await getUserById("65601f418c702f4a28bc1e71");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;
