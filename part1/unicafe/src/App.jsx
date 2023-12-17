import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const Feedback = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
    </div>
  )
}

const Row = ({text, value}) => <div>{text} {value}</div>

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const total = good + neutral + bad

  const getAverage = () => {
    const GOOD_FACTOR = 1
    const BAD_FACTOR = -1

    let average = 0

    if (total > 0) {
      average = (good * GOOD_FACTOR + bad * BAD_FACTOR) / total
    }

    return average
  }

  const getPositivePercentage = () => {
    let positive = 0

    if (good > 0) {
      positive = good / total * 100
    }
    
    return positive
  }

  if (total > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <Row text='good' value={good} />
        <Row text='neutral' value={neutral} />
        <Row text='bad' value={bad} />
        <Row text='all' value={total} />
        <Row text='average' value={getAverage()} />
        <Row text='positive' value={getPositivePercentage() + ' %'} />
      </div>
    )
  }
  
  return (
    <div>
      <h2>statistics</h2>
      <Row text='No feedback given' />
    </div>
  )
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
      <Statistics good={good} 
                  neutral={neutral} 
                  bad={bad} 
      />
    </div>
  )
}

export default App