const { getUserProducer } = require("../broker/userProducer");
const PostModel = require("../models/Post");

const paginated = async (req, res, next) => {
  try {
    // params
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // Posts and users
    const allPosts = await PostModel.find();
    const ids = allPosts.map((post) => post.user);
    const users = await getUserProducer({ id: ids });
    const total = allPosts.length;

    const posts = allPosts.map((post) => ({
      ...post.toObject(),
      user: users.find((user) => user._id === post.user),
    }));

    // const isValid = checkValidReq(total, page, limit, startIndex, endIndex);

    // req.page = isValid ? page : 1;
    // req.limit = isValid ? limit : total;
    // req.startIndex = isValid ? startIndex : 0;
    // req.endIndex = isValid ? endIndex : total;
    // req.posts = posts;
    // req.isValid = isValid;
    next();
  } catch (error) {
    next(error);
  }
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const checkValidReq = (total, page, limit, start, end) => {
  if (!(Number.isInteger(page) && Number.isInteger(limit))) return false;
  if (limit > total) return false;
  if (start < 0 || start >= total) return false;
  if (end > total) return false;
  return true;
};

module.exports = paginated;
