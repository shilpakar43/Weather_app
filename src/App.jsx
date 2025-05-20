/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import ReactDom from 'react-dom/client'
import './App.css'

function App() {
  const [cities, setCities] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [isLoding, SetIsLoding] = useState(true);
  useEffect(() => {
    fetchcitiesoptions();

  }, [])
  const fetchcitiesoptions = () => {
    fetch(`http://dataservice.accuweather.com/locations/v1/topcities/100?apikey=${import.meta.env.VITE_API_KEY}`)
      .then((data) => data.json())
      .then((response) => {
        console.log(response)
        setCities(response);
      })
  }
  const fetchCurrentWeather = (locationkey) => {
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationkey}?apikey=${import.meta.env.VITE_API_KEY}`)
      .then((data) => data.json())
      .then((response) => {
        setCurrentWeather(response[0])
        SetIsLoding(false)
      })

  }
  const handleLocationChange = (event) => {
    if (event.target.value != "") {
      SetIsLoding(true)
      fetchCurrentWeather(event.target.value)
    }
  }

  return (
    <>
      <div className='background'>
        <h1>Weather App</h1>
        <div className="card">
          <select name="city" id="city" onChange={handleLocationChange} >
            <option value=""> Select City</option>
            {
              cities.map((city, index) => {
                return <option value={city.Key}>
                  {city.LocalizedName}
                </option>
              })
            }
          </select>
          {
            currentWeather ?
              isLoding ?
                <>Loading...</>
                :
                <div className='card mt-5'>
                  <div className='row'>
                    <div className='col'>
                      <div className="row">
                        {
                          currentWeather?.Temperature?.Metric?.Value + " ° " + currentWeather?.Temperature?.Metric?.Unit

                        }
                      </div>
                      <div className="row">
                        {
                          currentWeather?.Temperature?.Imperial?.Value + " ° " + currentWeather?.Temperature?.Imperial?.Unit
                        }
                      </div>
                    </div>
                    <div className="class col">
                      {
                        currentWeather?.WeatherText
                      }
                    </div>
                  </div>

                </div>
              :
              <></>
          }
        </div>
      </div>
    </>
  )
}


export default App
