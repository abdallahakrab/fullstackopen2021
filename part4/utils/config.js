require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URI:
    process.env.NODE_ENV === "TEST"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
};
module.exports = config;
