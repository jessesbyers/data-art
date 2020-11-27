import React, { useEffect } from 'react';
// import { drawFlowers } from './d3/DrawFlowers'
import './App.css';
import Navbar from './Components/Navbar'

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
          // Bolton Landing: 43.629282888670126, -73.65996137603766
          let lat = "43.629282"
          let lon = "-73.659961"


          // set to Bolton Landing. Use a form and local state to inject user data into fetch url
          let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly&appid=" + apiKey

          const response = await fetch(apiUrl, requestOptions)
          const data = await response.json()
          console.log(data)
          // drawFlowers(data)
          // setDays(data)
          // setIsLoading(false);
      }
      fetchData();
  }, []);

  return (

    <div>
      <Navbar/>
        <div className="viz">
        </div>
    </div>
  );
}

export default App;
