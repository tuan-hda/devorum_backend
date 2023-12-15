const PostModel = require("../../models/Post");

const updatePost = async (req, res, next) => {
  try {
    const user = req.user;
    const { _id, ...updatedData } = req.body;
    
    const condition = {
      _id,
      
    }

    const post = await PostModel.findByIdAndUpdate(_id, updatedData, {
      new: true, // Trả về dữ liệu cập nhật
      populate: "tags", // Populate tags sau khi cập nhật
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = updatePost;
