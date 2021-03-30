const mongoose = require('mongoose')

if (process.argv < 3) {
  process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const URL = `mongodb+srv://akrab:${password}@cluster0.fvbjo.mongodb.net/Contacts?retryWrites=true&w=majority`
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })
}
Person.find({}).then((people) => {
  console.log('phonebook:')
  people
    .map((person) => `${person.name} ${person.number}`)
    .forEach((person) => console.log(person))
  mongoose.connection.close()
})
