const PostModel = require("../../models/Post");
const createHttpError = require("http-errors");

const deletePost = async (req, res, next) => {
  try {
    // const user = req.user;
    // const { post_id } = req.body;

    // const post = await PostModel.findById(post_id);

    // if (!post) {
    //   throw createHttpError[404]("Not found");
    // }

    // if (post.user !== user._id) {
    //   throw createHttpError[403]("Forbidden");
    // }

    // await PostModel.findByIdAndDelete({ _id: post_id });

    res.status(200).json({ ms: "Delete post successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;