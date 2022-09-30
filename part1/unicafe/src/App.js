import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const count = good + neutral + bad
  const average = (good - bad) / count
  const positive = good / count * 100
  if (count === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={count} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} suffix={'%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.suffix}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />

      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App