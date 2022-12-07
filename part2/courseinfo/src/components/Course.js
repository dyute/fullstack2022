import React from 'react'

const Header = ({name}) => <h3>{name}</h3>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => (
    parts.map(part => 
      <Part key={part.id} part={part} />
    ) 
)

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)
  return <b>total of {total} exercises</b>
}

const Course = (props) => {
    console.log('Course', props)
    const course = props.course
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course