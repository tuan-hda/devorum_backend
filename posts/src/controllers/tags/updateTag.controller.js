const TagModel = require("../../models/Tag");
const createHttpError = require("http-errors");

const updateTag = async (req, res, next) => {
  try {
    const user = req.user;
    const { tag_id, name, desc } = req.body;

    const updatedData = {
      name: name.trim().replace(/\s+/g, "-").toLowerCase(),
      desc,
    };

    const tag = await TagModel.findById(tag_id);

    if (!tag) {
      throw createHttpError[404]("Not found");
    }

    if (tag.author_id !== user._id) {
      throw createHttpError[403]("Forbidden");
    }

    const updatedTag = await TagModel.findByIdAndUpdate(tag_id, updatedData, {
      new: true,
    });

    if (!updatedTag) {
      throw createHttpError[500]("Internal server error");
    }

    res.status(200).json(updatedTag);
  } catch (error) {
    next(error);
  }
};

module.exports = updateTag;
