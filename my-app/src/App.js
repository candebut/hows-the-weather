import React, { useState } from 'react';

import './App.css';

const api = {
  key: '9dd6ae3c36c8240db1a4de9a799180b6',
  base: 'https://api.openweathermap.org/data/2.5/weather?q='
}

const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? (weather.weather[0].main === 'rain') ? 'app-rainy' : (weather.main.temp < 286) ? 'app-cold' : (weather.main.temp > 299 ? 'app-warm' : 'app') : 'app'}>
      <main className="search-box">
        <div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} °K</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div >
  );
}

export default App;
