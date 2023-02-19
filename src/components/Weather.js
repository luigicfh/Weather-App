import React, { useEffect, useState } from "react";
import logo from "../static/weather-forecast.png";
import temperature from "../static/temperature.png";

function TimeIcon() {
  const localHours = new Date().getHours();

  if (localHours < 16) {
    return <i className="bi bi-brightness-high-fill"></i>;
  } else if (localHours < 19) {
    return <i className="bi bi-brightness-alt-high-fill"></i>;
  } else {
    return <i className="bi bi-moon-fill"></i>;
  }
}

async function getUserLocation(setLocation, setWeather) {
  const response = await fetch("https://geolocation-db.com/json/").then(
    (response) => response.json()
  );
  setLocation(response);
  getWeatherData(response.latitude, response.longitude, setWeather);
}

async function getWeatherData(lat, lon, setWeather) {
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`;
  const response = await fetch(endpoint).then((response) => response.json());
  setWeather(response);
}

function Header() {
  return (
    <nav
      className="navbar"
      style={{ backgroundColor: "rgba(255,255,255, 0.6)" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 d-flex">
          <div style={{ marginRight: 10 }}>
            <TimeIcon />
          </div>
          Weather App
        </span>
      </div>
    </nav>
  );
}

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, [currentTime]);

  return currentTime ? currentTime : "";
}

function WeatherWidget() {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();
  useEffect(() => {
    getUserLocation(setLocation, setWeather);
  }, []);
  return (
    <div className="row mt-3 mx-auto">
      <div className="col-md-8 col-12 mx-auto">
        <div
          style={{
            backgroundColor: "rgba(255,255,255, 0.7)",
            borderRadius: "20px",
            padding: "20px",
          }}
          className="card"
        >
          <div className="card-body">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" style={{ width: "60px" }} />
              <h2 style={{ marginLeft: "10px" }}>Welcome!</h2>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 mx-auto">
                <h5 className="mb-3">
                  Country:{" "}
                  {location ? (
                    location.country_name
                  ) : (
                    <small style={{ color: "gray" }}>fetching country...</small>
                  )}
                </h5>
                <h5 className="mb-3">
                  City:{" "}
                  {location ? (
                    location.city
                  ) : (
                    <small style={{ color: "gray" }}>fetching city...</small>
                  )}
                </h5>
                <h5 className="mb-3">
                  State:{" "}
                  {location ? (
                    location.state
                  ) : (
                    <small style={{ color: "gray" }}>fetching state...</small>
                  )}
                </h5>
              </div>
              <div className="col-md-6">
                <h1>
                  {weather
                    ? `${weather.current_weather.temperature}°`
                    : "fetching weather"}
                  <img
                    src={temperature}
                    alt="Temp"
                    style={{ height: "60px" }}
                  ></img>
                </h1>
              </div>
            </div>
          </div>
          <div
            className="card-footer mx-auto"
            style={{ backgroundColor: "transparent" }}
          >
            <h2>
              <CurrentTime />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherComponent() {
  return (
    <React.Fragment>
      <Header />
      <WeatherWidget />
    </React.Fragment>
  );
}
