import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import NumberList from './NumberList.jsx'
import PersonForm from './PersonForm.jsx'
import './App.css'
import personService from './server/phonebook.js'
import Toaster from './Toaster.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchString,setSearchString] = useState('');
  const [toaster, setToaster] = useState(null)

  useEffect(()=>{
    personService.getAll()
    .then((response)=>{
      setPersons(response)
    })
  },[])

  useEffect(() => {
  if (!toaster) {
    return
  }
  const timer = setTimeout(() => {
    setToaster(null)
  }, 2000)
  return () => clearTimeout(timer)
}, [toaster])

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
        showToaster(`${response.name} has been updated in the phonebook`, 'success');
      })
      .catch((error)=>{
        console.log(error)
      })
      return
    }

    personService.create(person).then((response)=>{
      setPersons(persons.concat(response))
      showToaster(`${response.name} has been added to the phonebook`, 'success');
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
    if(!person) {
      console.log(`Person with id ${id} not found`)
      toaster.showToaster(`Person with id ${id} not found`, 'error');
      return
    }
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

  function showToaster(message, type) {
    setToaster({ message, type })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Toaster message={toaster?.message} type={toaster?.type} />
      <Filter handleSearch={handleSearch}/>
      <PersonForm addPerson={addPerson}/>
      <NumberList persons={persons.filter((person)=> person.name.includes(searchString))} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
