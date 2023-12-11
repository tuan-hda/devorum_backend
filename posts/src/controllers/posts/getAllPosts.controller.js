const { getUserProducer } = require("../../broker/userProducer");
const PostModel = require("../../models/Post");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allPosts = await PostModel.find();

    const result = await allPosts.map(async (post) => {
      const user = await getUserProducer({ id: [post.user.id] });
      return {
        ...post,
        user,
      };
    });
    console.log(
      "🚀 ~ file: getAllPosts.controller.js:21 ~ result ~ result:",
      result
    );

    res.status(200).json(result.slice(startIndex, endIndex));
    // const data = await getUserProducer({ username: "tuan-hdxa" });
    // res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;
