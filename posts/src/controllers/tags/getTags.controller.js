const { ObjectId } = require("mongodb");
const { getUserProducer } = require("../../broker/userProducer");
const PostModel = require("../../models/Post");
const TagModel = require("../../models/Tag");

const getTags = async (req, res, next) => {
  try {
    const { ids, names, include } = req.query;

    const condition = {};
    if (ids) condition._id = { $in: ids };
    if (names) condition.name = { $in: names };
    else if (include)
      condition.name = { $regex: new RegExp(include.trim(), "i") };

    const data = await TagModel.find(condition);
    if (data.length === 0) return res.status(200).json([]);

    const getPostsByTag = async (tag_id) => {
      const posts = await PostModel.where({
        tags: { $in: [tag_id] },
      });
      return posts.map((post) => post.toObject()._id);
    };

    const promises = data.map(async (tag) => {
      const post_ref = await getPostsByTag(tag.toObject()._id);

      return {
        ...tag.toObject(),
        post_ref,
      };
    });

    const result = await Promise.all(promises);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getTags;
