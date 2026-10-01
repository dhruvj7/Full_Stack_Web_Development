import { useEffect, useState } from 'react'
import weatherService from './services/weather'

const weatherKey = import.meta.env.VITE_WEATHER_API_KEY

function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState('')

  useEffect(() => {
    let cancelled = false

    if (!weatherKey) {
      setWeather(null)
      setWeatherError('Add VITE_WEATHER_API_KEY to your environment to see the weather.')
      return () => { cancelled = true }
    }

    if (!country.capital?.length) {
      setWeather(null)
      setWeatherError('Weather is unavailable because this country has no capital listed.')
      return () => { cancelled = true }
    }

    setWeather(null)
    setWeatherError('')
    weatherService.getForCapital(country.capital[0], country.cca2, weatherKey)
      .then((data) => {
        if (!cancelled) setWeather(data)
      })
      .catch(() => {
        if (!cancelled) setWeatherError('Weather data could not be loaded.')
      })

    return () => { cancelled = true }
  }, [country])

  return (
    <section className="country-details">
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.join(', ') || 'Not listed'}</p>
      <p>Area: {country.area.toLocaleString()} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      {country.flags?.svg && (
        <img
          className="flag"
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
        />
      )}

      <h3>Weather in {country.capital?.[0] || 'the capital'}</h3>
      {weatherError && <p className="message">{weatherError}</p>}
      {weather && (
        <div className="weather">
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
      {!weather && !weatherError && <p>Loading weather…</p>}
    </section>
  )
}

export default CountryDetails
