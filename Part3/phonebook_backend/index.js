require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (request) => (
  request.method === 'POST' ? JSON.stringify(request.body) : ''
))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

app.get('/api/persons/info', async (request, response) => {
  const count = await Person.countDocuments({})
  response.send(`
    <main>
      <h1>Phonebook has info for ${count} people</h1>
      <p>${new Date().toString()}</p>
    </main>
  `)
})

app.get('/api/persons/:id', async (request, response) => {
  const person = await Person.findById(request.params.id)

  if (!person) {
    return response.status(404).json({ error: 'person not found' })
  }

  response.json(person)
})

app.delete('/api/persons/:id', async (request, response) => {
  const deletedPerson = await Person.findByIdAndDelete(request.params.id)

  if (!deletedPerson) {
    return response.status(404).json({ error: 'person not found' })
  }

  response.status(204).end()
})

app.post('/api/persons', async (request, response) => {
  const { name, number } = request.body || {}

  if (!name?.trim() || !number?.trim()) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  const trimmedName = name.trim()
  const trimmedNumber = number.trim()
  const existingPerson = await Person.findOne({ name: trimmedName })

  if (existingPerson) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = new Person({ name: trimmedName, number: trimmedNumber })
  const savedPerson = await person.save()
  response.status(201).json(savedPerson)
})

app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.code === 11000) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  response.status(500).json({ error: 'internal server error' })
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gna3dg5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

async function start() {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to the .env file.')
  }

  await mongoose.connect(uri, { family: 4 })
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch((error) => {
  console.error('Failed to start the server:', error.message)
  process.exitCode = 1
})
