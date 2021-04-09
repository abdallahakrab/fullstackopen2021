const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const intialBlogs = require("../utils/test_helper").intialBlogs;
const intialUsers = require("../utils/test_helper").intialUsers;
beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(intialBlogs[0]).save();
  // await User.deleteMany({});
  // await new User(intialUsers[0]).save();
});
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzA1NTE5NTdlYzViM2VhNWZjYmU1MyIsInVzZXJuYW1lIjoiYWJkYWxsYWgzMjYiLCJpYXQiOjE2MTc5NzQ2MTh9.7t06wMZAJNUk5SiiByzdc-7UGcrW4emF0mup7yN_va4";
test("GET Blogs return correct count of blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(1);
  expect(response.body[0].id).toBeDefined();
});

test("POST BLOG increment blogs by one", async () => {
  const newBlog = {
    title: "Type battle",
    author: "John C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 9,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", token)
    .expect(201);
  const blogs = await api.get("/api/blogs");
  expect(blogs.body).toHaveLength(2);
});
test("POST BLOG url,title missing", async () => {
  const newBlog = {
    author: "John C. Martin",
    likes: 9,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(400);
});

test("POST BLOG likes missing, default 0", async () => {
  const newBlog = {
    title: "Type battle",
    author: "John C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201);
  expect(response.body.likes).toBe(0);
});

test("POST BLOG without token", async () => {
  const newBlog = {
    title: "Type battle",
    author: "John C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 9,
  };
  const response = await api.post("/api/blogs").send(newBlog);
  expect(response.status).toBe(401);
});

test("Adding invalid user: Username is not unique", async () => {
  const newUser = {
    name: "Mohamed",
    username: "abdallah326",
    password: "123456",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
  expect(response.body.error).toContain("username must be unique");
});
test("Adding invalid user: Username less than 3 characters", async () => {
  const newUser = {
    name: "Mohamed",
    username: "ab",
    password: "123456",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
  expect(response.body.error).toContain(
    "username length must be greater than 3"
  );
});
test("Adding invalid user: Missing password", async () => {
  const newUser = {
    name: "Mohamed",
    username: "thisisrightusername",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
  expect(response.body.error).toContain("must provide a password");
});

test("Adding invalid user: Password length less than 3", async () => {
  const newUser = {
    name: "Mohamed",
    username: "thisisrightusername",
    password: "21",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
  expect(response.body.error).toContain("password min length 3 characters");
});

test("Login with valid credintials", async () => {
  const info = { username: "abdallah326", password: "123456" };
  const response = await api.post("/api/login").send(info).expect(200);
  console.log(response.body);
});
