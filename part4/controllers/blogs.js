const Router = require("express").Router;
const app = require("../app");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

blogsRouter = Router();

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});
//verify token if not athenic return 401? , verified , extract user id, add new blog to user's bloglist & blog creater
blogsRouter.post("/", async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user.id });
  // console.log(request.body);
  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: "blog url or title is missing" });
  }

  const savedBlog = await blog.save();
  user.notes = user.notes.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
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
