const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


morgan.token('body', (request) => (
  request.method === 'POST' ? JSON.stringify(request.body) : ''
))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/info', (request, response) => {
  const requestTime = new Date().toString()
  response.send(`
    <main>
      <h1>Phonebook has info for ${persons.length} people</h1>
      <p>${requestTime}</p>
    </main>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((entry) => entry.id === request.params.id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'person not found' })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((entry) => entry.id !== request.params.id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body || {}

  if (!name?.trim() || !number?.trim()) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  const trimmedName = name.trim()
  const trimmedNumber = number.trim()

  if (persons.some((person) => person.name === trimmedName)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: String(Math.floor(Math.random() * 100000000000)),
    name: trimmedName,
    number: trimmedNumber,
  }

  persons = persons.concat(person)
  response.status(201).json(person)
})

app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
