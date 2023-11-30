const paginated = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  result.previous = {
    page: page - 1,
    limit: limit,
  };
  result.next = {
    page: page + 1,
    limit: limit,
  };

  const allPosts = await PostModel.find()
    .populate("user")
    .populate("tag")
    .exec();
  res.status(200).json(allPosts.slice(startIndex, endIndex));
};

module.exports = paginated;
