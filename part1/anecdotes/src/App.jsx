import { useState } from 'react'

const AnecdoteOfTheDay = (props) => {
  const {text, votes, handleVote, handleNextAnecdote} = props
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={text}/>
      <AnecdoteVotes votesCount={votes} />
      <Button text='vote' handleClick={handleVote} />
      <Button text='next anecdote' handleClick={handleNextAnecdote} />
    </div>
  )
}

const Anecdote = ({text}) => <p>{text}</p>

const AnecdoteVotes = ({votesCount}) => {
  return <p>has {votesCount} votes</p>
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const MostPopularAnecdote = ({anecdotes, votes}) => {
  const getMostPopularAnecdote = () => {
    const maxVotes = Math.max(...votes)
    const indexOfMax = votes.indexOf(maxVotes)
    return anecdotes[indexOfMax]
  }

  const totalVotes = votes.reduce((accum, cur) => accum + cur, 0)
  if (totalVotes === 0) {
    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>It's seems like nobody didn't vote</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={getMostPopularAnecdote()}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only walsy to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const maxIndex = anecdotes.length - 1
    let randomIndex = selected
    while (randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * maxIndex)
    }
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected]++
    setVotes(updatedVotes)
  }

  return (
    <>
      <AnecdoteOfTheDay text={anecdotes[selected]} 
                        votes={votes[selected]} 
                        handleNextAnecdote={handleNextAnecdote}
                        handleVote={handleVote}/>
      <MostPopularAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App