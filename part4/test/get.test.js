const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const intialBlogs = require("../utils/test_helper").intialBlogs;
beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(intialBlogs[0]).save();
});

test("GET Blogs return correct count of blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(1);
  expect(response.body[0].id).toBeDefined();
});

test("POST BLOG increment blogs by one", async () => {
  const newBlog = new Blog({
    title: "Type battle",
    author: "John C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 9,
  });
  await api.post("/api/blogs").send(newBlog).expect(201);
  const blogs = await api.get("/api/blogs");
  console.log(blogs);
  expect(blogs.body).toHaveLength(2);
});
test("POST BLOG url,title missing", async () => {
  const newBlog = new Blog({
    author: "John C. Martin",
    likes: 9,
  });
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("POST BLOG likes missing, default 0", async () => {
  const newBlog = new Blog({
    title: "Type battle",
    author: "John C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  });
  const response = await api.post("/api/blogs").send(newBlog).expect(201);
  expect(response.body.likes).toBe(0);
});
