import { useState } from 'react'
import './App.css'
import Statistics from './Statistics.jsx'
import Buttons from './Buttons.jsx'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Buttons setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
