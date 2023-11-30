const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const TagModel = mongoose.model("tag", TagSchema);
module.exports = TagModel;
