const Router = require("express");
const app = require("../app");
const Blog = require("../models/blog");

blogsRouter = Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body._doc);
  console.log(request.body._doc);
  if (!blog.url || !blog.title) {
    return response.status(400).send("error");
  }

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
