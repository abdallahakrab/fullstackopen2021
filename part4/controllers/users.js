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
  if (!user.password) {
    return res.status(400).send({ error: "must provide a password" });
  }
  if (user.password.length < 3) {
    return res.status(400).send({ error: "password min length 3 characters" });
  }
  const newUser = new User({
    name: user.name,
    username: user.username,
    passwordHash: await bcrypt.hash(user.password, 8),
  });
  try {
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send({ error: e.message });
    }
  }
});

module.exports = userRouter;
