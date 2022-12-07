import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Weather = ({ city }) => {
    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        console.log('get weather')
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
            .then(response => {
                console.log(response.data)
                setWeather(response.data)
            })
    }, [])
    console.log('render weather')

    if (weather === '') {
        return <p>Loading weather of {city}...</p>
    }

    const celcius = weather.main.temp - 273.15
    const img_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div>
            <h3>Weather in {city}</h3>
            <p>temperature {celcius.toFixed(2)} Celcius</p>
            <img src={img_url} className="capital-weather" alt="weather" />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}<br></br>area {country.area}</p>

            <h4>languages:</h4>
            <ul>
                {Object.entries(country.languages).map(([key, value]) =>
                    <li key={key}>{value}</li>
                )}
            </ul>

            <img src={country.flags.svg} className="country-flag" alt="flag" width="150" />
        </div>
    )
}

const Country = ({ country }) => {
    const [showDetail, setShowDetail] = useState(false)

    const handleClick = () => setShowDetail(!showDetail)
    if (showDetail) {
        return (
            <div>
                {country.name.common}
                <Button handleClick={handleClick} text="hide" country={country} />
                <CountryDetail country={country} />
            </div>
        )
    }
    return (
        <div>
            {country.name.common}
            <Button handleClick={handleClick} text="show" country={country} />
        </div>
    )
}

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length === 1) {
        return (
            <div>
                <CountryDetail country={countries[0]} />
                <Weather city={countries[0].capital} />
            </div>
        )
    }
    return (
        countries.map(country =>
            <Country key={country.cca2} country={country} />
        )
    )
}

export default Countries