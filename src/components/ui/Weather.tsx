import { useState, useEffect } from "react";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({
    temperature: "",
    code: "",
  });
  const [weatherDataLoading, setWeatherDataLoading] = useState(true);

  useEffect(function () {
    if (window.localStorage.getItem("weather")) {
      let location = JSON.parse(String(window.localStorage.getItem("weather")));
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location[0]}&longitude=${location[1]}&current_weather=true&timezone=auto`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData({
            temperature: data.current_weather.temperature,
            code: data.current_weather.weathercode,
          });
          setWeatherDataLoading(false);
        });
    }
  }, []);

  return (
    <>
      {!weatherDataLoading ? (
        <>
          <div className="flex flex-row justify-center space-x-1">
            <img
              src={`https://openweathermap.org/img/wn/${
                String(weatherData.code).length == 1
                  ? `0${weatherData.code}`
                  : weatherData.code
              }d@2x.png`}
              width={35}
            />
            <p className="my-auto text-lg">{weatherData.temperature}</p>
          </div>
        </>
      ) : null}
    </>
  );
}
