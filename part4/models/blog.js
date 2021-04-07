const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (current, recieved) => {
    recieved.id = current._id;
    delete recieved._id;
    delete recieved.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
