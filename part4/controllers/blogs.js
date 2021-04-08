const Router = require("express").Router;
const app = require("../app");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

blogsRouter = Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});
//verify token if not athenic return 401? , verified , extract user id, add new blog to user's bloglist & blog creater
blogsRouter.post("/", async (request, response) => {
  const token = request.token;
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (e) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user.id });
  // console.log(request.body);
  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: "blog url or title is missing" });
  }
  console.log(user);
  const savedBlog = await blog.save();
  console.log(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  try {
    await User.findByIdAndUpdate(user.id, user, { new: true });
  } catch (error) {
    return console.error(error);
  }
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (e) {
    return response.status(401).json({ error: "invalid or missing token" });
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "invalid or missing token" });
  }
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).send("resource deleted");
  }
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: "invalid or missing token" });
  }

  //authenticated:
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send("resource deleted");
});

blogsRouter.patch("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, {
    likes: request.body.likes,
  });
  response.status(200).send("likes updated");
});

module.exports = blogsRouter;
