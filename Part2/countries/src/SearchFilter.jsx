function SearchFilter({ query, onQueryChange }) {
  return (
    <div>
      <label htmlFor="country-search">Find countries</label>{' '}
      <input
        id="country-search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>
  )
}

export default SearchFilter
