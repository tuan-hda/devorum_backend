const PostModel = require("../../models/Post");
const createHttpError = require("http-errors");

const addView = async (req, res, next) => {
  try {
    const user = req.user;
    const { _id } = req.body;

    const post = await PostModel.findById(_id);

    if (!post) {
      throw createHttpError[404]("Not found");
    }

    if (!post.views.includes(user._id)) {
      post.views.push(user._id);
    }

    await post.save();

    res.status(200).json({ views: post.views });
  } catch (error) {
    next(error);
  }
};

module.exports = addView;
