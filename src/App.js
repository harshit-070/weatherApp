import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Navbar from "./Navbar";

function App() {
  const cityRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (loading === true) {
      return;
    }
    e.preventDefault();
    const city = cityRef.current.value;
    if (city == null || city.length === 0) {
      alert("Invalid city");
      return;
    }
    setLoading(true);

    const cityData = await getCityData(city);
    setLoading(false);

    cityRef.current.value = "";

    if (cityData == null) {
      alert("Invalid City name");
      return;
    }
    setweatherData(cityData);
  };

  const [weatherDataList, setWeatherDataList] = useState([]);
  const [weatherData, setweatherData] = useState([]);
  const [myWeatherData, setMyWeatherData] = useState({});

  const getCityData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      if (response.request.status === 404) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getMyCityData = async () => {
    if (loading === true) {
      return;
    }
    setLoading(true);
    try {
      const success = async (data) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
        try {
          const response = await axios.get(url);

          setLoading(false);
          if (response.request.status === 404) {
            return null;
          }
          console.log(response.data);
          setMyWeatherData(response.data);
        } catch (error) {
          console.log(error);
          setLoading(false);
          return null;
        }
      };

      const error = (error) => {
        alert("Please give gelocation access");
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityDataList = async (cityList) => {
    for (const city of cityList) {
      const response = await getCityData(city);
      if (response != null) {
        setWeatherDataList((prevData) => [...prevData, response]);
      }
    }
  };

  useEffect(() => {
    getCityDataList(["Delhi", "Mumbai", "Kolkata", "Bangalore", "Texas"]);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <section className="top-banner">
        <div className="container">
          <h1 className="heading"> Weather App</h1>

          <input
            type="text"
            placeholder="Search for a city"
            autoFocus={true}
            ref={cityRef}
          />
          <button onClick={handleSubmit} className="button">
            {loading ? "Loading..." : "Search"}
          </button>
          <button onClick={getMyCityData} className="button">
            {loading ? "Loading..." : "My city Weather"}
          </button>
          <span className="msg"></span>
        </div>
      </section>
      <section className="section upper">
        <div className="container">
          {Object.keys(weatherData).length !== 0 ? (
            <>
              <h3 className="headi ng white"> Search Result</h3>
              <ul className="cities">
                <WeatherCard data={weatherData} />
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="container">
          {Object.keys(myWeatherData).length !== 0 ? (
            <>
              <h5 className="heading white"> My city Temperature</h5>
              <ul className="cities">
                <WeatherCard data={myWeatherData} />
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ul className="cities">
            {weatherDataList.map((element, index) => {
              return <WeatherCard data={element} key={index} />;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
