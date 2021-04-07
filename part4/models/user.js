const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    minLength: [3, "username length must be greater than 3 "],
  },
  passwordHash: String,
});

userSchema.plugin(uniqueValidator, { message: "username must be unique" });

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

User = mongoose.model("User", userSchema);

module.exports = User;
