const { getUserProducer } = require("../../broker/userProducer");
const TagModel = require("../../models/Tag");

const getTags = async (req, res, next) => {
  try {
    const { ids, names } = req.query;

    const condition = {};
    if (ids) condition._id = { $in: ids };
    if (names) condition.name = { $in: names };

    const data = await TagModel.find(condition);
    if (data.length === 0) return res.status(200).json([]);

    // const author_ids = data.map((tag) => tag.author_id);
    // const users = await getUserProducer({ id: author_ids });

    const result = data.map((tag) => ({
      ...tag.toObject(),
      // author: users.find((user) => user._id === tag.author_id),
    }));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTags;
