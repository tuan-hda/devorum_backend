const { getUserProducer } = require("../../broker/userProducer");
const PostModel = require("../../models/Post");

const getPosts = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {};
    // Posts and users
    const data = await PostModel.paginate(condition, {
      offset,
      limit,
      populate: ["tags", "comments"],
    });

    const ids = data.docs.map((post) => post.user);
    const users = await getUserProducer({ id: ids });

    const posts = data.docs.map((post) => ({
      ...post.toObject(),
      user: users.find((user) => user._id === post.user),
      tags: post.toObject().tags.filter((tag) => !tag.deleted),
    }));

    const result = {
      totalItems: data.totalDocs,
      posts: posts,
      totalPages: data.totalPages,
      currentPage: data.page,
    };

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

module.exports = getPosts;
