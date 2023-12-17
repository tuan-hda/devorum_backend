const TagModel = require("../../models/Tag");
const createHttpError = require("http-errors");

const deleteTag = async (req, res, next) => {
  try {
    const user = req.user;
    const { tag_id } = req.body;

    const tag = await TagModel.findById(tag_id);

    if (!tag) {
      throw createHttpError[404]("Not found");
    }

    if (tag.author_id !== user._id) {
      throw createHttpError[403]("Forbidden");
    }

    await TagModel.deleteById(tag_id);

    res.status(200).json({ ms: "Delete post successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTag;
