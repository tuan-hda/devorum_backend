const PostModel = require("../../models/Post");
const getUserById = require("../../utils/gRPC");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allPosts = await PostModel.find();
    // .populate("user");
    // .populate("tag")
    // .exec();
    // res.status(200).json(allPosts.slice(startIndex, endIndex));
    const user = await getUserById("656e96252d8e5d48d0c8cd7e");
    console.log(
      "🚀 ~ file: getAllPosts.controller.js:18 ~ getAllPosts ~ user:",
      user
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;
