const PostModel = require("../../models/Post");
const createHttpError = require("http-errors");

const updatePost = async (req, res, next) => {
  try {
    const user = req.user;
    const { post_id, title, content, tags } = req.body;

    const updatedData = {
      title,
      content,
      tags,
    };

    const post = await PostModel.findById(post_id);

    if (!post) {
      throw createHttpError[404]("Not found");
    }

    if (post.user !== user._id) {
      throw createHttpError[403]("Forbidden");
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      post_id,
      updatedData,
      { new: true, populate: "tags" }
    );

    if (!updatedPost) {
      throw createHttpError[500]("Internal server error");
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = updatePost;
