import { useEffect, useState } from 'react'
import CountryDetails from './CountryDetails'
import SearchFilter from './SearchFilter'
import SearchResults from './SearchResults'
import countriesService from './services/countries'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    countriesService.getAll()
      .then(setCountries)
      .catch(() => setError('Country data could not be loaded.'))
  }, [])

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matches = normalizedQuery
    ? countries.filter((country) => country.name.common.toLocaleLowerCase().includes(normalizedQuery))
    : []

  function updateQuery(value) {
    setQuery(value)
    setSelectedCountry(null)
  }

  return (
    <main className="app">
      <h1>Countries</h1>
      <SearchFilter query={query} onQueryChange={updateQuery} />

      {error && <p className="message">{error}</p>}
      {normalizedQuery && matches.length > 10 && <p>Too many matches, specify another filter</p>}
      {normalizedQuery && matches.length > 1 && matches.length <= 10 && (
        <SearchResults countries={matches} onShowCountry={setSelectedCountry} />
      )}
      {normalizedQuery && matches.length === 1 && <CountryDetails country={matches[0]} />}
      {selectedCountry && matches.length > 1 && matches.length <= 10 && (
        <CountryDetails country={selectedCountry} />
      )}
      {normalizedQuery && matches.length === 0 && !error && <p>No matches</p>}
    </main>
  )
}

export default App
