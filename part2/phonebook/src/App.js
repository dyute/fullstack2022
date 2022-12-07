import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    // console.log('render', persons.length, 'notes')
    
    const personsToShow = persons.filter(
        person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const addPerson = (personObject) => {
        const person = persons.find(p => p.name === personObject.name)
        if (person !== undefined) {
            updatePerson(person.id, personObject)
        }
        else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage({
                        type: "success",
                        text: `Added ${personObject.name}`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
                .catch(error => {
                    console.error(error)
                    setMessage({
                        type: "error",
                        text: `Faild to add ${personObject.name}`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
        }
    }

    const updatePerson = (id, personObject) => {
        if (window.confirm(
            `${personObject.name} is already added to phonebook, replace the old number with the new one?`)) {
            personService
                .update(id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                    setMessage({
                        type: "success",
                        text: `Updated ${personObject.name}`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
                .catch(error => {
                    console.error(error)
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage({
                        type: "error",
                        text: `Information of ${personObject.name} has already been removed from server`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deleteOne(id)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage({
                        type: "success",
                        text: `Deleted ${person.name}`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
                .catch(error => {
                    console.error(error)
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage({
                        type: "error",
                        text: `Information of ${person.name} has already been removed from server`,
                    })
                    setTimeout(() => {setMessage(null)}, 5000)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App