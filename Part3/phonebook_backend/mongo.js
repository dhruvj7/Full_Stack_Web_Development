const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const username = process.env.MONGODB_USERNAME || 'dhruv'

if (!password) {
  console.log('Usage: node mongo.js <password> [name] [number]')
  process.exit(1)
}

if ((name && !number) || (!name && number)) {
  console.log('Provide both a name and a number to add an entry.')
  process.exit(1)
}

const url = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.gna3dg5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

async function main() {
  try {
    await mongoose.connect(url, { family: 4 })

    if (name && number) {
      const person = new Person({ name, number })
      await person.save()
      console.log(`added ${name} number ${number} to phonebook`)
    } else {
      const people = await Person.find({})
      console.log('phonebook:')
      people.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
    }
  } catch (error) {
    console.error('Database operation failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

main()
