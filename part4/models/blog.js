const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (current, recieved) => {
    recieved.id = current._id;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
