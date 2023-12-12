const getPosts = async (req, res, next) => {
  try {
    const { page, limit, startIndex, endIndex, posts, isValid } = req;
    
    // Result
    const result = {};

    result.totalDocs = posts.length;
    result.results = isValid ? posts.slice(startIndex, endIndex) : posts;
    result.totalPages = isValid
      ? Math.ceil(result.totalDocs / Number.parseFloat(limit))
      : 1;
    result.limit = isValid ? limit : allPosts.length;
    result.currentPage = isValid ? page : 1;
    result.hasPrevPage = 1 < result.currentPage;
    result.hasNextPage = result.currentPage < result.totalPages;
    if (result.hasPrevPage) result.prev = result.currentPage - 1;
    if (result.hasNextPage) result.next = result.currentPage + 1;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getPosts;
