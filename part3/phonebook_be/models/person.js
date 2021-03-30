const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const URL = process.env.MONGODB_URI;

mongoose
  .connect(URL, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("successfuly connected to db"))
  .catch((e) => {
    console.log(e.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Names must be at least 3 characters long"],
    unique: true,
  },
  number: {
    type: String,
    minLength: [8, "Numbers must be at least 8 digits long"],
  },
});
personSchema.plugin(uniqueValidator);
personSchema.set("toJSON", {
  transform: (doc, returnedDocument) => {
    returnedDocument.id = doc._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
