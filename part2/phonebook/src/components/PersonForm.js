import { useState } from "react";

const PersonForm = ({ addPerson }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newName.trim() === "") 
            return
        const personObject = {
            name: newName,
            number: newNumber,
        }
        addPerson(personObject)
        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>name: <input value={newName} onChange={handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm