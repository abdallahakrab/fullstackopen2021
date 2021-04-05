const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const config = require('./utils/config')
const BlogRouter = require('./controllers/blogs') 

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const app = express()
app.use(cors())
app.use(express.json())



app.use('/api/blogs',BlogRouter)


module.exports = app