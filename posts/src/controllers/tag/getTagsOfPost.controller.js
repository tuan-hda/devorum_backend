const TagModel = require("../../models/Tag");

const getTagsOfPost = async (req, res, next) => {
  try {
    // const tags = await TagModel.find();
    // res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = getTagsOfPost;
