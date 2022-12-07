const Person = ({ person, deleteThis }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={deleteThis}>delete</button>
        </li>
    )
}

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person =>
                <Person key={person.id} person={person} deleteThis={() => deletePerson(person.id)} />
            )}
        </ul>
    )
}

export default Persons