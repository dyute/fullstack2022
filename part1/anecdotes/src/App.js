import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Anecdote = ({anecdote, votes}) => <p>{anecdote}<br></br>has {votes} votes</p>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomIndex = () => Math.floor(Math.random() * anecdotes.length)
  const most = votes.indexOf(Math.max(...votes))

  const setToSelected = () => {
    const index = randomIndex()
    console.log(index)
    setSelected(index)
  }
  const setToVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={setToVotes} text={"vote"} />
      <Button handleClick={setToSelected} text={"next anecdote"} />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[most]} votes={votes[most]} />
    </div>
  )
}

export default App