import { useState } from 'react'
import Filter from './Filter.jsx'
import NumberList from './NumberList.jsx'
import PersonForm from './PersonForm.jsx'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [searchString,setSearchString] = useState('');

  const addPerson = (person) => {
    const existingPerson = persons.find(per => per.name === person.name)
    if (existingPerson) {
      alert('user with same name already exists')
      return
    }
    setPersons(persons.concat(person))
  }

  function handleSearch(searchString){
    setSearchString(searchString);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <PersonForm addPerson={addPerson}/>
      <NumberList persons={persons.filter((person)=> person.name.includes(searchString))}/>
    </div>
  )
}

export default App
