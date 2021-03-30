require('dotenv').config()
const express = require('express')
const { json} = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(json())
app.use(cors())
// New Token:

morgan.token('req-body', function (req ) {
  return Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : ''
})
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res),
      'ms',
      tokens['req-body'](req, res),
    ].join(' ')
  })
)

const errorHandler = (err, req, res, next) => {
  console.log('ERROR ', err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  next(err)
}
const newId = () => {
  return Math.ceil(Math.random() * 10000)
}
app.get('/', (request, response) => {
  response.send('<h1> Hello Frontend </h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people)
    })
    .catch((error) => {
      next(error)
    })
  // response.send(persons);
})

// app.get("/api/persons/:id", (request, response) => {
//   const person = persons.find(
//     (person) => request.params.id === person.id.toString()
//   );
//   if (!person) {
//     response.status(404).send("not found");
//   }
//   response.send(person);
// });
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      console.log(person)
      response.status(200).json(person)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  // const person = persons.find(
  // (person) => request.params.id === person.id.toString()
  // );
  Person.findByIdAndDelete(request.params.id).then(() => {
    return response.status(204).end()
  })
  // if (!person) {
  // return response.status(404).send("Not found");
  // }

  // // // persons = persons.filter(
  // //   (person) => person.id != request.params.id.toString()
  // );
  // response.status(204).send("Deleted");
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response
      .status(400)
      .send({ error: 'you must specify name and number' })
  }
  // if (persons.find((person) => request.body.name === person.name)) {
  //   return response
  //     .status(400)
  //     .send({ error: `${request.body.name} already exists` });
  // }
  // const newPerson = {
  //   name: request.body.name,
  //   number: request.body.number,
  //   id: newId(),
  // };
  // eslint-disable-next-line no-unused-vars
  new Person({
    name: request.body.name,
    number: request.body.number,
    id: newId(),
  })
    .save()
    .then((savedDoc) => response.json(savedDoc))
    .catch((error) => next(error))
  // persons = persons.concat(newPerson);
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    {
      number: req.body.number,
    },
    { new: true }
  )
    .then((updatedPerson) => {
      res.status(200).json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then((people) =>
    response.send(`<p>Phonebook has info for ${people.length} People</p>
    <p>${Date()}</p>`)
  )
})
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app is up and running ${PORT}`)
})
