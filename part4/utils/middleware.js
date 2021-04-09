const jwt = require("jsonwebtoken");
const config = require("./config");
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  request.token =
    authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.substring(7)
      : null;
  next();
};

const userExtractor = async (request, response, next) => {
  // id then findUserById
  const token = request.token;
  let decodedToken = null;
  try {
    // console.log(token);
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (e) {
    // console.error(e);
    return response.status(401).json({ error: "token missing or invalid DT" });
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};

module.exports = { tokenExtractor, userExtractor };
