function SearchResults({ countries, onShowCountry }) {
  return (
    <ul className="country-list">
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button type="button" onClick={() => onShowCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default SearchResults
