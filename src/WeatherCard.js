import React from "react";

function WeatherCard({ data }) {
  console.log(data);
  const {
    weather,
    name,
    sys: { country },
    main: { temp },
  } = data;
  return (
    <div>
      <li className="city">
        <h2 className="city-name" data-name={name}>
          <span>{name}</span>
          <sup>{country}</sup>
        </h2>
        <span className="city-temp">
          {Math.round(temp)}
          <sup>°C</sup>
        </span>
        <figure>
          <img
            className="city-icon"
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].main}
          />
          <figcaption>{weather[0].main}</figcaption>
        </figure>
      </li>
    </div>
  );
}

export default WeatherCard;
