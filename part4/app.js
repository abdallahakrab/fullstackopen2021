const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const BlogRouter = require("./controllers/blogs");
const UserRouter = require("./controllers/users");
const LoginRouter = require("./controllers/login");
const { tokenExtractor, userExtractor } = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

app.use("/api/blogs", BlogRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", LoginRouter);

module.exports = app;
