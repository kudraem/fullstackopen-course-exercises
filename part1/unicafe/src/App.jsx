import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const Feedback = ({handleGood, handleNeutral, handleBad}) => {
  return <div>
    <h2>give feedback</h2>
    <Button text='good' handleClick={handleGood} />
    <Button text='neutral' handleClick={handleNeutral} />
    <Button text='bad' handleClick={handleBad} />
  </div>
}

const Row = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({good, neutral, bad}) => {
  return <div>
    <h2>statistics</h2>
    <Row text='good' value={good} />
    <Row text='neutral' value={neutral} />
    <Row text='bad' value={bad} />
  </div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback handleGood={() => setGood(good + 1)}
                handleNeutral={() => setNeutral(neutral + 1)}
                handleBad={() => setBad(bad + 1)} 
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App