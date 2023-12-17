import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const Feedback = ({handleGood, handleNeutral, handleBad}) => {
  return <div>
    <h1>give feedback</h1>
    <Button text='good' handleClick={handleGood} />
    <Button text='neutral' handleClick={handleNeutral} />
    <Button text='bad' handleClick={handleBad} />
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
    </div>
  )
}

export default App