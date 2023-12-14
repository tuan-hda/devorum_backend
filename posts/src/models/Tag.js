const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  author_id: {
    type: String,
    require: true,
  },
});

const TagModel = mongoose.model("tag", TagSchema);
module.exports = TagModel;
