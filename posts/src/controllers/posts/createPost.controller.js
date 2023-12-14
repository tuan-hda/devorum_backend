const PostModel = require("../../models/Post");
const TagModel = require("../../models/Tag");

const createPost = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, content, tags } = req.body;

    const data = {
      user: user._id,
      title,
      content,
      tags,
    };

    const post = await PostModel.create(data);

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
module.exports = createPost;
