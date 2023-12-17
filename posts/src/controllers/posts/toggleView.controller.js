const PostModel = require("../../models/Post");
const createHttpError = require("http-errors");

const toggleView = async (req, res, next) => {
  try {
    const user = req.user;
    const { post_id } = req.body;

    const post = await PostModel.findById(post_id);

    if (!post) {
      throw createHttpError[404]("Not found");
    }

    if (post.views.includes(user._id)) {
      post.views = post.views.filter((userId) => userId !== user._id);
    } else {
      post.views.push(user._id);
    }

    await post.save();

    res.status(200).json({ views: post.views });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleView;
