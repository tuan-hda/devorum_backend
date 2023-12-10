const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
