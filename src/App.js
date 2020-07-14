import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [days, setDays] = useState([]);
 
  useEffect( () => {
      async function fetchData() {
          let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          let apiKey = process.env.REACT_APP_API_KEY

          // set to Chicago. Use a form and local state to inject user data into fetch url
          // add toggle to switch from celcius to fahrenheit
          let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=current,minutely,hourly&appid=" + apiKey
         
          const response = await fetch(apiUrl, requestOptions)
          const data = await response.json()
          setDays(data)
      }
      fetchData();
  }, []);

  return (
    <div>
        {console.log(days)}

      <h1 className="viz-title">viz 1</h1>
      <div className="viz-1">
      </div>
    </div>
  );
}

export default App;
