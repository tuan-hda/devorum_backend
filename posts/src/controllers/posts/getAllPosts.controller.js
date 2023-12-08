const { getUserProducer } = require("../../broker/userProducer");
const PostModel = require("../../models/Post");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allPosts = await PostModel.find();
    // .populate("user");
    // .populate("tag")
    // .exec();
    // res.status(200).json(allPosts.slice(startIndex, endIndex));
    const data = await getUserProducer({ username: "tuan-hdxa" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;