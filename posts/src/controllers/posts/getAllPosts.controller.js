const { getUserProducer } = require("../../broker/userProducer");
const PostModel = require("../../models/Post");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const posts = await PostModel.find();

    const ids = posts.map((post) => post.user);
    const users = await getUserProducer({ id: ids });
    const result = posts.map((post, index) => ({
      // ...JSON.parse(post),
      user: users[index],
    }));
    console.log(
      "🚀 ~ file: getAllPosts.controller.js:19 ~ result ~ users:",
      users
    );

    res.status(200).json(result.slice(startIndex, endIndex));
    // const data = await getUserProducer({ username: "tuan-hdxa" });
    // res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPosts;
