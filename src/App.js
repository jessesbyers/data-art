import React, { useEffect } from 'react';
import { drawFlowers } from './d3/DrawFlowers'
import './App.css';
// import Flowers from './Components/Flowers'

function App() {

  // const [days, setDays] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

 
  useEffect( () => {
      async function fetchData() {
        // setIsLoading(true);

          let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          let apiKey = process.env.REACT_APP_API_KEY
          let lat = "44.811345"
          let lon = "-73.149572"


          // set to St Albans. Use a form and local state to inject user data into fetch url
          let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly&appid=" + apiKey

          const response = await fetch(apiUrl, requestOptions)
          const data = await response.json()
          drawFlowers(data)
          // setDays(data)
          // setIsLoading(false);
      }
      fetchData();
  }, []);

  return (

    // <div>
    //   {isLoading ? (
    //       <h1>Loading</h1>
    //   ) : (
        <div className="viz">
        </div>
    //   )}
    // </div>
  );
}

export default App;
