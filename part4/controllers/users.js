const mongoose = require("mongoose");
const router = require("express").Router;
const User = require("../models/user");

const bcrypt = require("bcrypt");
const userRouter = new router();

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const user = req.body;
  console.log(user);

  const newUser = new User({
    name: user.name,
    username: user.username,
    passwordHash: await bcrypt.hash(user.password, 8),
  });
  console.log(newUser);
  const result = await newUser.save();
  res.status(201).json(result);
});

module.exports = userRouter;
