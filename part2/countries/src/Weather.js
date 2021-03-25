import axios from "axios";
import React, { useState, useEffect } from "react";

function Weather({ capital }) {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      )
      .then((res) => {
        console.log(res.data.current);
        setWeather(res.data.current);
      });
  }, [capital]);
  console.log(weather);
  if (weather === null) {
    console.log("here");
    return <div>Weather Info Loading</div>;
  }
  //   console.log(weather);
  return (
    <div>
      <p>Temperature{weather.temperature}</p>
      <p>
        Wind: {weather.wind_speed} MPH Direction {weather.wind_dir}
      </p>
      <img src={weather.weather_icons[0]} alt="weather icon" />
    </div>
  );
}

export default Weather;
