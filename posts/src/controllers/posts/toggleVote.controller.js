const PostModel = require("../../models/Post");
const createHttpError = require("http-errors");

const toggleVote = async (req, res, next) => {
  try {
    const user = req.user;
    const { _id } = req.body;

    const post = await PostModel.findById(_id);

    if (!post) {
      throw createHttpError[404]("Not found");
    }

    if (post.votes.includes(user._id)) {
      post.votes = post.votes.filter((userId) => userId !== user._id);
    } else {
      post.votes.push(user._id);
    }

    await post.save();

    res.status(200).json({ votes: post.votes });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleVote;
