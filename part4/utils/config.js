require("dotenv").config()

const config = {
PORT: process.env.PORT || 3003,
<<<<<<< HEAD
MONGODB_URI: process.env.MONGODB_URI
=======
MONGODB_URI: "mongodb+srv://akrab:123456a@cluster0.fvbjo.mongodb.net/bloglist?retryWrites=true&w=majority"
>>>>>>> 4c389874ee469c3513000f14f6a32f402435c327

}
module.exports = config