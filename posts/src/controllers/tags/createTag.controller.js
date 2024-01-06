const TagModel = require("../../models/Tag");

const createTags = async (req, res, next) => {
  try {
    const { tags } = req.body;
    const user = req.user;

    const data = tags.map((tag) => ({
      ...tag,
      name: tag.name.trim().replace(/\s+/g, "-").toLowerCase(),
      author_id: user._id,
    }));

    const existingTags = await TagModel.find({
      name: { $in: data.map((tag) => tag.name) },
    });

    const newData = data.filter(
      (tag) => !existingTags.map((tag) => tag.name).includes(tag.name)
    );

    const result = await TagModel.insertMany(newData);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = createTags;
