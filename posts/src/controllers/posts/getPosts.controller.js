const getPosts = async (req, res, next) => {
  try {
    const { page, limit, startIndex, endIndex, posts, isValid } = req;

    // Result
    const result = {};

    result.totalDocs = posts.length;
    result.results = posts.slice(startIndex, endIndex);
    result.totalPages = isValid
      ? Math.ceil(result.totalDocs / Number.parseFloat(limit))
      : 1;
    result.limit = limit;
    result.currentPage = page;
    result.hasPrevPage = 1 < page;
    result.hasNextPage = page < result.totalPages;
    if (result.hasPrevPage) result.prev = page - 1;
    if (result.hasNextPage) result.next = page + 1;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getPosts;
