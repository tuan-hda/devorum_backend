const { getUserProducer } = require("../broker/userProducer");
const PostModel = require("../models/Post");

const paginated = async (req, res, next) => {
  try {
    // params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Posts and users
    const allPosts = await PostModel.find();
    const ids = allPosts.map((post) => post.user);
    const users = await getUserProducer({ id: ids });

    const posts = allPosts.map((post, index) => ({
      ...post.toObject(),
      user: users.find((user) => user.id === post.user),
    }));

    const isValid = checkValidReq(
      allPosts.length,
      page,
      limit,
      startIndex,
      endIndex
    );

    req.page = page;
    req.limit = limit;
    req.startIndex = startIndex;
    req.endIndex = endIndex;
    req.posts = posts;
    req.isValid = isValid;
    next();
  } catch (error) {
    next(error);
  }
};

const checkValidReq = (total, page, limit, start, end) => {
  if (!(Number.isInteger(page) && Number.isInteger(limit))) return false;
  if (start < 0 || total <= end) return false;
  return true;
};

module.exports = paginated;
