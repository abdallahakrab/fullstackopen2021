const Router = require("express").Router;
const app = require("../app");
const Blog = require("../models/blog");

blogsRouter = Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  // console.log(request.body);
  if (!blog.url || !blog.title) {
    return response.status(400).send("error");
  }

  const result = await blog.save();
  response.status(201).json(result);
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
