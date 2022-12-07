import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        console.log('get countries')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])
    console.log('render', countries.length, 'countries')

    const countriesFiltered = countries.filter(
        counries => counries.name.common.toLowerCase().includes(newSearch.toLowerCase()))

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value)
    }

    return (
        <div>
            <div>find countries<input value={newSearch} onChange={handleSearchChange} /></div>
            <Countries countries={countriesFiltered} />
        </div>
    )
}

export default App