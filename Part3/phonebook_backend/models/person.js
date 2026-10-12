const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name must be at least 3 characters long'],
  },
  number: {
    type: String,
    required: true,
    minLength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: (number) => /^\d{2,3}-\d+$/.test(number),
      message: 'Phone number must have two or three digits, a hyphen, then digits',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
