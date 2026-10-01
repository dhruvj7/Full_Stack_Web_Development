import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import NumberList from './NumberList.jsx'
import PersonForm from './PersonForm.jsx'
import './App.css'
import personService from './server/phonebook.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchString,setSearchString] = useState('');

  useEffect(()=>{
    personService.getAll()
    .then((response)=>{
      setPersons(response)
    })
  },[])

  const addPerson = (person) => {
    const existingPerson = persons.find(per => per.name === person.name)

    //older code to check if person already exists in the phonebook.
    // if (existingPerson) {
    //   alert('user with same name already exists')
    //   return
    // }

    if(existingPerson){
      if(!window.confirm(`${person.name} already exists in the phonebook. Replace the old number with the new one?`)){
        return
      }
      personService.update(existingPerson.id, person)
      .then((response)=>{
        setPersons(persons.map((per)=> per.id === existingPerson.id ? response : per))
      })
      .catch((error)=>{
        console.log(error)
      })
      return
    }

    personService.create(person).then((response)=>{
      setPersons(persons.concat(response.data))
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  function handleSearch(searchString){
    setSearchString(searchString);
  }

  function deletePerson(id){
    const person = persons.find((person)=> person.id === id)
    if(!window.confirm(`Are you sure you want to delete ${person.name}?`)){
      return
    }
    personService.deletePerson(id).then(()=>{
      setPersons(persons.filter((person)=> person.id !== id))
    })
    .catch((error)=>{
      console.log(error)
    })

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <PersonForm addPerson={addPerson}/>
      <NumberList persons={persons.filter((person)=> person.name.includes(searchString))} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
