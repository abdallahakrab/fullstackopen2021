require("dotenv").config()

const config = {
PORT: process.env.PORT || 3003,
MONGODB_URI: "mongodb+srv://akrab:123456a@cluster0.fvbjo.mongodb.net/bloglist?retryWrites=true&w=majority"

}
module.exports = config