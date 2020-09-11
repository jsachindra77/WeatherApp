import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselBar from "./CarouselBar";
import HeaderBar from "./HeaderBar";
import BodyBar from "./BodyBar";
import { Layout, Divider } from "antd";

const WeatherApp = (props) => {
  const [weatherData, setWeatherData] = useState({});
  const [currentDetails, setCurrentDetails] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [cityForecast, setCityForecast] = useState([]);

  const weatherForecastDetails = () => {
    let foreCastApi =
      "https://api.openweathermap.org/data/2.5/onecall?lat=12.9716&lon=77.5946&units=metric&exclude=hourly,minutely&appid=7a9219e8134d2f603942bee7178b7d4e";
    let cityCastApi =
      "https://api.openweathermap.org/data/2.5/group?id=2950159,5128581,2643743,6094817,2988507&units=metric&appid=7a9219e8134d2f603942bee7178b7d4e";

    const requestOne = axios.get(foreCastApi);
    const requestTwo = axios.get(cityCastApi);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          setWeatherData(responses[0].data);
          setCurrentDetails(responses[0].data.current);
          setDailyForecast(responses[0].data.daily);
          setCityForecast(responses[1].data.list);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    weatherForecastDetails();
  }, []);

  const width = window.innerWidth;
  const isMobile = width <= 500;
  const { Footer } = Layout;
  if (!isMobile) {
    return (
      <div>
        <HeaderBar />
        <CarouselBar data={weatherData} currentData={currentDetails} />
        <BodyBar data={dailyForecast} cityForecast={cityForecast} />
        <Footer className="footer">
          <Divider orientation="left" className="divider"></Divider>
          <h3 className="footerTitle">@WeatherInfo App</h3>
        </Footer>
      </div>
    );
  } else {
    return (
      <div>
        <HeaderBar />
        <CarouselBar currentData={currentDetails} />
        <BodyBar data={dailyForecast} />
        <Footer className="footer">
          <Divider orientation="left" className="divider"></Divider>
          <h3 className="footerTitle">@WeatherInfo App</h3>
        </Footer>
      </div>
    );
  }
};

export default WeatherApp;
