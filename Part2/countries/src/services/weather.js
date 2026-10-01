import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getForCapital = (capital, countryCode, apiKey) =>
  axios.get(baseUrl, {
    params: {
      q: `${capital},${countryCode}`,
      appid: apiKey,
      units: 'metric',
    },
  }).then((response) => response.data)

export default { getForCapital }
